import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectQueue } from "@nestjs/bullmq";
import { In, Repository } from "typeorm";
import { Queue } from "bullmq";
import * as crypto from "crypto";
import { InvitationEmailSendFailedException } from "../exceptions/invitation-email-send.learner.exception";
import { IInviteBulkLearnerService } from "../interfaces/services/invite-bulk.learner.service.interface";
import { TYPES } from "../interfaces";
import { IBulkInviteParserResolver } from "../interfaces/parsers/bulk-invite-parser-resolver.interface";
import { BulkLearnerRowResultDto } from "../dto/learner-bulk-invite-response.dto";
import { ApiLogger } from "src/utils/logger/api-logger.service";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { OrganizationEntity } from "src/modules/organization/domain/organization.entity";

type ParsedValidRow = { row: number; email: string; name: string };

@Injectable()
export class InviteBulkLearnerService implements IInviteBulkLearnerService {
  constructor(
    @Inject(TYPES.parsers.IBulkInviteParserResolver)
    private readonly parser: IBulkInviteParserResolver,
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepo: Repository<OrganizationEntity>,
    @InjectQueue("emails")
    private emailsQueue: Queue
  ) { }

  private readonly logger = new ApiLogger(InviteBulkLearnerService.name);

  async invite(
    file: Express.Multer.File,
    spaceId: number
  ): Promise<BulkLearnerRowResultDto[]> {
    const { parsed, errorResults, skippedResults } = this.parseFile(file);

    if (parsed.valid.length === 0) {
      return [...errorResults, ...skippedResults];
    }

    const organizationName = await this.organizationRepo
      .createQueryBuilder('organization')
      .innerJoin('organization.spaces', 'space')
      .where('space.id = :spaceId', { spaceId })
      .select(['organization.name'])
      .getOne()
      .then(org => org.name);

    const valid = this.dedupeByEmailKeepFirst(parsed.valid);

    const emails = valid.map((v) => v.email);

    const existing = await this.findExistingLearners(spaceId, emails);
    const existingByEmail = new Map(existing.map((l) => [l.email, l]));

    const results: BulkLearnerRowResultDto[] = [];
    const toInsert: LearnerEntity[] = [];
    const toEmail: Array<{ email: string; token: string; row: number; name: string }> = [];

    for (const { row, email, name } of valid) {
      const ex = existingByEmail.get(email);

      if (ex && ex.status !== "invited") {
        results.push(this.createResponse(row, email, "Error", name, ["The learner is already registered in this space."]));
        return;
      }

      const token = crypto.randomBytes(20).toString("hex");

      if (ex && ex.status === "invited") {
        toEmail.push({ email, token, row, name });
        continue;
      }

      toInsert.push(
        this.learnerRepo.create({
          email,
          name,
          spaceId,
          status: "invited",
          invitedAt: new Date(),
          invitationToken: token,
          assignedByUser: null,
        })
      );
      toEmail.push({ email, token, row, name });
    }

    const okEmails = new Set<string>();

    this.logger.log(`Inviting ${toInsert.length} learners in bulk for space ${spaceId}`);

    if (toInsert.length > 0) {
      try {
        await this.learnerRepo.insert(toInsert);
        for (const l of toInsert) okEmails.add(l.email);
      } catch (e: any) {
        this.logger.error(`Bulk insert failed: ${e?.message ?? e}`);
        for (const l of toInsert) {
          results.push(this.createResponse(
            valid.find(v => v.email === l.email)?.row ?? -1,
            l.email,
            "Error",
            l.name,
            ["Failed to save learner."]
          ));
        }
      }
    }

    for (const e of toEmail) {
      if (!okEmails.has(e.email)) continue;

      try {
        await this.sendEmail(e.email, e.token, organizationName);
        results.push(this.createResponse(e.row, e.email, "OK", e.name));
      } catch (err) {
        results.push(this.createResponse(e.row, e.email, "Error", e.name, ["Failed to send invitation email."]));
      }
    }

    return [...errorResults, ...skippedResults, ...results];
  }

  private async sendEmail(email: string, token: string, organization: string) {
    this.logger.log(`Sending invitation email to learner with email: ${email}`);

    const magicLink = `${process.env.PUBLIC_URL}/accept-invite/${token}`;

    try {
      await this.emailsQueue.add("send", {
        to: email,
        from: process.env.SMTP_GLOBAL_FROM,
        subject: `${organization} invited you to join their Shira space`,
        template: "learner-invitation",
        data: { email, magicLink, organization },
      });
      this.logger.log(`Invitation email queued successfully for email: ${email}`);
    } catch (error: any) {
      this.logger.error(`Failed to send invitation email to ${email}: ${error?.message ?? error}`);
      throw new InvitationEmailSendFailedException(email);
    }
  }

  private parseFile(file: Express.Multer.File) {
    const parsed = this.parser.parse(file);

    const errorResults = parsed.errors.map(({ row, email, name, error }) =>
      this.createResponse(row, email, "Error", name, error)
    );

    const skippedResults = parsed.skipped.map(({ row, email, name, reason }) =>
      this.createResponse(row, email, "Skipped", name, [reason])
    );

    return { parsed, errorResults, skippedResults };
  }

  private createResponse(
    row: number,
    email: string,
    status: "OK" | "Error" | "Skipped",
    name: string,
    message?: string[]
  ): BulkLearnerRowResultDto {
    return {
      row,
      email,
      name,
      status,
      ...(message ? { message } : {}),
    };
  }

  private async findExistingLearners(spaceId: number, emails: string[]) {
    const chunkSize = 1000;

    const out: Array<Pick<LearnerEntity, "id" | "email" | "status">> = [];
    for (let i = 0; i < emails.length; i += chunkSize) {
      const chunk = emails.slice(i, i + chunkSize);

      const found = await this.learnerRepo.find({
        where: { spaceId, email: In(chunk) },
        select: { id: true, email: true, status: true },
      });

      out.push(...found);
    }
    return out;
  }

  private async bulkUpdateInvitationsById(
    updates: Array<{ id: number; token: string }>,
    invitedAt: Date
  ) {
    const table = this.learnerRepo.metadata.tableName;
    const idColumn = this.learnerRepo.metadata.columns.find(c => c.propertyName === "id")?.databaseName ?? "id";
    const tokenColumn =
      this.learnerRepo.metadata.columns.find(c => c.propertyName === "invitationToken")?.databaseName ?? "invitation_token";
    const invitedAtColumn =
      this.learnerRepo.metadata.columns.find(c => c.propertyName === "invitedAt")?.databaseName ?? "invited_at";

    // si tu driver usa snake_case distinto, esto lo cubre porque usa metadata.
    const ids = updates.map(u => u.id);

    // armamos CASE para token
    const cases = updates
      .map((u) => `WHEN ${u.id} THEN ?`)
      .join(" ");

    const sql = `
      UPDATE ${table}
      SET
        ${invitedAtColumn} = ?,
        ${tokenColumn} = CASE ${idColumn} ${cases} END
      WHERE ${idColumn} IN (${ids.map(() => "?").join(",")})
    `;

    const params: any[] = [invitedAt, ...updates.map(u => u.token), ...ids];

    await this.learnerRepo.query(sql, params);
  }

  private dedupeByEmailKeepFirst(rows: ParsedValidRow[]) {
    const seen = new Set<string>();
    const out: ParsedValidRow[] = [];
    for (const r of rows) {
      const key = r.email.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ ...r, email: key });
    }
    return out;
  }
}
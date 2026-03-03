import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectQueue } from "@nestjs/bullmq";
import { In, Repository } from "typeorm";
import { Queue } from "bullmq";
import * as crypto from "crypto";
import { InvitationEmailSendFailedException } from "../exceptions/invitation-email-send.learner.exception";
import { IInviteBulkLearnerService } from "../interfaces/services/invite-bulk.learner.service.interface";
import { BulkLearnerRowResultDto } from "../dto/learner-bulk-invite-response.dto";
import { BulkInviteValidatedLearnerDto } from "../dto/learner-bulk-invite-request.dto";
import { ApiLogger } from "src/utils/logger/api-logger.service";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { OrganizationEntity } from "src/modules/organization/domain/organization.entity";

@Injectable()
export class InviteBulkLearnerService implements IInviteBulkLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepo: Repository<OrganizationEntity>,
    @InjectQueue("emails")
    private emailsQueue: Queue
  ) { }

  private readonly logger = new ApiLogger(InviteBulkLearnerService.name);

  async invite(
    learners: BulkInviteValidatedLearnerDto[],
    spaceId: number
  ): Promise<BulkLearnerRowResultDto[]> {
    if (!learners || learners.length === 0) {
      return [];
    }

    const organizationName = await this.organizationRepo
      .createQueryBuilder('organization')
      .innerJoin('organization.spaces', 'space')
      .where('space.id = :spaceId', { spaceId })
      .select(['organization.name'])
      .getOne()
      .then(org => org.name);

    const validatedEmails = learners.map((v) => v.email);
    const existingLearners = await this.findExistingLearners(spaceId, validatedEmails);

    const toInsert = [];
    const toEmail = [];

    for (const { row, email, name } of learners) {
      const token = crypto.randomBytes(20).toString("hex");

      // resend the invitation to invited learners
      const existingLearner = existingLearners.get(email);
      if (existingLearner && existingLearner.status === "invited") {
        toEmail.push({ email, token, row, name });
        continue;
      }

      toInsert.push(
        {
          entity: this.learnerRepo.create({
            email,
            name,
            spaceId,
            status: "invited",
            invitedAt: new Date(),
            invitationToken: token,
            assignedByUser: null,
          }),
          row,
          email,
          name,
        }
      );
      toEmail.push({ email, token, row, name });
    }

    const okEmails = new Set<string>();
    const results = [];

    this.logger.log(`Inviting ${toInsert.length} learners in bulk for space ${spaceId}`);

    await this.saveLearners(toInsert, okEmails);
    await this.sendInvitations(toEmail, okEmails, organizationName, results);

    return results;
  }

  private async findExistingLearners(spaceId: number, emails: string[]): Promise<Map<string, LearnerEntity>> {
    if (!emails.length) return new Map();

    const existing = await this.learnerRepo.find({
      where: { spaceId, email: In(emails) },
      select: { id: true, email: true, status: true },
    });

    return new Map(existing.map((l) => [l.email, l]));
  }

  private async sendInvitations(
    toEmail: { email: string; token: string; row: number; name: string; }[],
    okEmails: Set<string>,
    organizationName: string,
    results: BulkLearnerRowResultDto[]
  ) {
    for (const e of toEmail) {
      if (!okEmails.has(e.email)) continue;

      try {
        await this.sendEmail(e.email, e.token, organizationName);
        results.push({ row: e.row, email: e.email, name: e.name, status: "OK" });
      } catch (error) {
        this.logger.error(`Failed to send email to ${e.email}: ${error?.message ?? error}`);
      }
    }
  }

  private async saveLearners(
    toInsert: Array<{ entity: LearnerEntity; row: number; email: string; name: string }>,
    okEmails: Set<string>,
  ) {
    if (toInsert.length > 0) {
      try {
        await this.learnerRepo.save(toInsert.map((item) => item.entity));
        for (const l of toInsert) okEmails.add(l.email);
      } catch (error) {
        this.logger.error(`Bulk insert failed: ${error?.message ?? error}`);
      }
    }
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

}

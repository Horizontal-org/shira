import { Inject, Injectable } from "@nestjs/common";
import { SavingLearnerException as SaveLearnerException } from "../exceptions/save.learner.exception";
import { ConflictLearnerException } from "../exceptions/conflict.learner.exception";
import { InvitationEmailSendFailedException } from "../exceptions/invitation-email-send.learner.exception";
import { IInviteBulkLearnerService } from "../interfaces/services/invite-bulk.learner.service.interface";
import { TYPES } from "../interfaces";
import { IInviteLearnerService } from "../interfaces/services/invite.learner.service.interface";
import { IBulkInviteParserResolver } from "../interfaces/parsers/bulk-invite-parser-resolver.interface";
import { BulkLearnerRowResultDto } from "../dto/learner-bulk-invite-response.dto";
import { ApiLogger } from "../logger/api-logger.service";
import { LearnerBulkUploadErrorCode } from "../exceptions/errors/learner-bulk.error-codes";
import { BulkInviteParsedResult } from "../interfaces/parsers/bulk-invite-parser.interface";
import { BulkCsvProcessingException } from "../exceptions/csv-bulk-could-not-process.learner.exception";
import { TooManyRowsException } from "../exceptions/csv-bulk-too-many-rows.learner.exception";

@Injectable()
export class InviteBulkLearnerService implements IInviteBulkLearnerService {
  constructor(
    @Inject(TYPES.services.IInviteLearnerService)
    private readonly inviteLearnerService: IInviteLearnerService,
    @Inject(TYPES.parsers.IBulkInviteParserResolver)
    private readonly parser: IBulkInviteParserResolver
  ) { }

  private readonly logger = new ApiLogger(InviteBulkLearnerService.name);

  async verify(
    file: Express.Multer.File,
    spaceId: number
  ): Promise<BulkLearnerRowResultDto[]> {
    const { parsed, errorResults, skippedResults } = this.parseFile(file);

    this.logger.log(`Verifying ${parsed.total} learners in bulk for space ID ${spaceId}`);

    const validResults = parsed.valid.map(({ row, email, name }) =>
      this.createResponse(row, email, "OK", name)
    );

    return [...errorResults, ...skippedResults, ...validResults];
  }

  async invite(
    file: Express.Multer.File,
    spaceId: number
  ): Promise<BulkLearnerRowResultDto[]> {
    const { parsed, errorResults, skippedResults } = this.parseFile(file);

    this.logger.log(`Inviting ${parsed.total} learners in bulk for space ${spaceId}`);

    const results = await Promise.all(
      parsed.valid.map(async ({ row, email, name }): Promise<BulkLearnerRowResultDto> => {
        try {
          await this.inviteLearnerService.invite({ email, name }, spaceId);
          return this.createResponse(row, email, "OK", name);
        } catch (err) {
          let message = "Unknown invitation error";

          if (err instanceof ConflictLearnerException) {
            message = "The learner is already registered in this space.";
          } else if (err instanceof SaveLearnerException) {
            message = "Failed to save learner.";
          } else if (err instanceof InvitationEmailSendFailedException) {
            message = "Failed to send invitation email.";
          }

          return this.createResponse(row, email, "Error", name, message);
        }
      })
    );

    return [...errorResults, ...skippedResults, ...results];
  }

  private parseFile(file: Express.Multer.File) {
    let parsed = this.parser.parse(file);

    const errorResults = parsed.errors.map(({ row, email, name, error }) =>
      this.createResponse(row, email, "Error", name, error)
    );
    const skippedResults = parsed.skipped.map(({ row, email, name, reason }) =>
      this.createResponse(row, email, "Skipped", name, reason)
    );

    return { parsed, errorResults, skippedResults };
  }

  private createResponse(
    row: number,
    email: string,
    status: "OK" | "Error" | "Skipped",
    name: string,
    message?: string
  ): BulkLearnerRowResultDto {
    return {
      row,
      email,
      name,
      status,
      ...(message ? { message } : {}),
    };
  }
}

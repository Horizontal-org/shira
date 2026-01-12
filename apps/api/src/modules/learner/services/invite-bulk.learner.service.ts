import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SavingLearnerException as SaveLearnerException } from "../exceptions/save.learner.exception";
import { ConflictLearnerException } from "../exceptions/conflict.learner.exception";
import { InvitationEmailSendFailedException } from "../exceptions/invitation-email-send.learner.exception";
import { IInviteBulkLearnerService } from "../interfaces/services/invite-bulk.learner.service.interface";
import { TYPES } from "../interfaces";
import { IInviteLearnerService } from "../interfaces/services/invite.learner.service.interface";
import { IBulkInviteParserResolver } from "../interfaces/parsers/bulk-invite-parser-resolver.interface";
import { BulkLearnerRowResultDto } from "../dto/learner-bulk-invite-response.dto";

@Injectable()
export class InviteBulkLearnerService implements IInviteBulkLearnerService {
  constructor(
    @Inject(TYPES.services.IInviteLearnerService)
    private readonly inviteLearnerService: IInviteLearnerService,
    @Inject(TYPES.parsers.IBulkInviteParserResolver)
    private readonly parserResolver: IBulkInviteParserResolver
  ) { }

  async invite(
    file: Express.Multer.File,
    spaceId: number
  ): Promise<BulkLearnerRowResultDto[]> {
    const parsed = this.parserResolver.parse(file);
    if (!parsed) {
      throw new BadRequestException("Unsupported file type");
    }

    const errorResults = parsed.errors.map(({ row, email, name, error }) =>
      this.createResponse(row, email, "Error", error, name)
    );
    const skippedResults = parsed.skipped.map(({ row, email, name, reason }) =>
      this.createResponse(row, email, "Skipped", reason, name)
    );

    const results = await Promise.all(
      parsed.valid.map(async ({ row, email, name }): Promise<BulkLearnerRowResultDto> => {
        try {
          await this.inviteLearnerService.invite({ email, name }, spaceId);
          return this.createResponse(row, email, "OK", undefined, name);
        } catch (err) {
          let message = "Unknown invitation error";

          if (err instanceof ConflictLearnerException) {
            message = "The learner is already registered in this space.";
          } else if (err instanceof SaveLearnerException) {
            message = "Failed to save learner.";
          } else if (err instanceof InvitationEmailSendFailedException) {
            message = "Failed to send invitation email.";
          }

          return this.createResponse(row, email, "Error", message);
        }
      })
    );

    return [...errorResults, ...skippedResults, ...results].sort((a, b) => a.row - b.row);
  }

  private createResponse(
    row: number,
    email: string,
    status: "OK" | "Error" | "Skipped",
    message?: string,
    name?: string
  ): BulkLearnerRowResultDto {
    return {
      row,
      email,
      ...(name ? { name } : {}),
      status,
      ...(message ? { message } : {}),
    };
  }
}

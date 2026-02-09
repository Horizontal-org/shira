import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { TYPES } from "../interfaces";
import { IBulkInviteParserResolver } from "../interfaces/parsers/bulk-invite-parser-resolver.interface";
import { BulkLearnerRowResultDto } from "../dto/learner-bulk-invite-response.dto";
import { ApiLogger } from "src/utils/logger/api-logger.service";
import { IVerifyBulkLearnerService } from "../interfaces/services/verify-bulk.learner.service.interface";

@Injectable()
export class VerifyBulkLearnerService implements IVerifyBulkLearnerService {
  constructor(
    @Inject(TYPES.parsers.IBulkInviteParserResolver)
    private readonly parser: IBulkInviteParserResolver,
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
  ) { }

  private readonly logger = new ApiLogger(VerifyBulkLearnerService.name);

  async verify(
    file: Express.Multer.File,
    spaceId: number
  ): Promise<BulkLearnerRowResultDto[]> {
    const { parsed, errorResults, skippedResults, validResults } = this.parseFile(file);

    this.logger.log(`Verifying ${parsed.total} learners in bulk for space ID ${spaceId}`);

    const existingLearners = await this.learnerRepo.find({
      where: {
        spaceId,
        email: In(parsed.valid.map(v => v.email)),
      },
    });

    this.logger.log(`Found ${existingLearners.length} existing learners in space ID ${spaceId}`);

    const rowByEmail = new Map(parsed.valid.map(({ email, row }) => [email, row]));

    const alreadyRegisteredResults = existingLearners.map(({ email, name }) =>
      this.createResponse(rowByEmail.get(email), email, "Skipped", name, ["already_registered"])
    );

    const newValidResults = validResults.filter(
      vr => !alreadyRegisteredResults.some(arr => arr.email === vr.email)
    );

    return [...errorResults, ...skippedResults, ...alreadyRegisteredResults, ...newValidResults];
  }

  private parseFile(file: Express.Multer.File) {
    let parsed = this.parser.parse(file);

    const errorResults = parsed.errors.map(({ row, email, name, error }) =>
      this.createResponse(row, email, "Error", name, error)
    );

    const skippedResults = parsed.skipped.map(({ row, email, name, reason }) =>
      this.createResponse(row, email, "Skipped", name, [reason])
    );

    const validResults = parsed.valid.map(({ row, email, name }) =>
      this.createResponse(row, email, "OK", name)
    );

    return { parsed, errorResults, skippedResults, validResults };
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
}

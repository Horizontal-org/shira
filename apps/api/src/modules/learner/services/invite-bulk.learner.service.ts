import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import * as crypto from "crypto";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { SpaceEntity } from "src/modules/space/domain/space.entity";
import { SavingLearnerException as SaveLearnerException } from "../exceptions/save.learner.exception";
import { ConflictLearnerException } from "../exceptions/conflict.learner.exception";
import { InvitationEmailSendFailedException } from "../exceptions/invitation-email-send.learner.exception";
import { GenericErrorException } from "../exceptions/generic-error.learner.exception";
import { LearnerOperationResponse } from "../dto/learner-operation-response.dto";
import { InvitationBulkLearnerDto } from "../dto/invitation-bulk.learner.dto";
import { IInviteBulkLearnerService } from "../interfaces/services/invite-bulk.learner.service.interface";

@Injectable()
export class InviteBulkLearnerService implements IInviteBulkLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>,
    @InjectQueue("emails")
    private readonly emailsQueue: Queue
  ) { }

  async invite(
    inviteBulkLearnerDto: InvitationBulkLearnerDto,
    spaceId: number
  ): Promise<LearnerOperationResponse[]> {
    const { learners } = inviteBulkLearnerDto;

    const okResults: Array<{ email: string; token: string }> = [];

    const results = await Promise.all(
      learners.map(async ({ quizId, email }): Promise<LearnerOperationResponse> => {
        try {
          const { token } = await this.inviteSingle(
            { email },
            spaceId
          );

          okResults.push({ email, token });

          return this.createResponse(quizId, email, "OK");
        } catch (err) {
          let message = "Unknown invitation error";

          if (err instanceof ConflictLearnerException) {
            message = "The learner is already registered in this space.";
          } else if (err instanceof SaveLearnerException) {
            message = "Failed to save learner.";
          }

          return this.createResponse(quizId, email, "Error", message);
        }
      })
    );

    await Promise.all(
      okResults.map(async ({ email, token }) => {
        try {
          await this.sendEmail(email, token);
        } catch (err) {
          this.updateInvitationStatusOnEmailError(
            results,
            email,
            err?.message
          );
        }
      })
    );

    return results;
  }

  private async inviteSingle(
    learnerData: { email: string; name?: string; assignedByUser?: number },
    spaceId: number
  ): Promise<{ token: string }> {
    const { email, name, assignedByUser } = learnerData;

    const existingLearner = await this.findLearner(spaceId, email);

    const hash = crypto.randomBytes(20).toString("hex");
    const token = existingLearner?.invitationToken ?? hash;

    const learner = this.learnerRepo.create({
      email,
      name,
      spaceId,
      status: "invited",
      invitedAt: new Date(),
      invitationToken: token,
      assignedByUser: assignedByUser ?? null
    });

    try {
      await this.handleExistingLearner(learner, existingLearner);
      return { token };
    } catch {
      throw new SaveLearnerException();
    }
  }

  private async findLearner(spaceId: number, email: string) {

    const existing = await this.learnerRepo.findOne({
      where: { spaceId, email },
    });

    if (existing && existing.status !== "invited") {
      throw new ConflictLearnerException();
    }

    return existing;
  }

  private async handleExistingLearner(
    learner: LearnerEntity,
    existingLearner?: LearnerEntity
  ) {
    if (existingLearner && existingLearner.status === "invited") {
      await this.learnerRepo.update(
        { id: existingLearner.id },
        { invitedAt: new Date() }
      );
    } else {
      await this.learnerRepo.save(learner);
    }
  }

  private async sendEmail(email: string, token: string) {
    const magicLink = `${process.env.PUBLIC_URL}/accept-invite/${token}`;

    try {
      await this.emailsQueue.add("send", {
        to: email,
        from: process.env.SMTP_GLOBAL_FROM,
        subject: "Invitation to register as a Learner in a Shira space",
        template: "learner-invitation",
        data: { email, magicLink },
      });
    } catch {
      throw new InvitationEmailSendFailedException();
    }
  }

  async accept(token: string): Promise<string> {
    const learner = await this.learnerRepo.findOne({
      where: {
        invitationToken: token,
        status: Not("registered"),
      },
    });

    if (!learner) throw new GenericErrorException();

    const space = await this.spaceRepo.findOne({
      where: { id: learner.spaceId },
      select: { name: true },
    });

    try {
      await this.learnerRepo.update(
        { invitationToken: token },
        { status: "registered", registeredAt: new Date() }
      );
      return space.name;
    } catch {
      throw new SaveLearnerException();
    }
  }

  private createResponse(
    quizId: number,
    email: string,
    status: "OK" | "Error",
    message?: string
  ): LearnerOperationResponse {
    return {
      quizId,
      email,
      status,
      ...(message ? { message } : {}),
    };
  }

  private updateInvitationStatusOnEmailError(
    results: LearnerOperationResponse[],
    email: string,
    errorMessage?: string
  ) {
    const result = results.find((r) => r.email === email);
    if (!result) return;

    const updated = this.createResponse(
      result.quizId,
      email,
      "Error",
      errorMessage ?? "Unknown error while sending invitation email"
    );

    result.status = updated.status;
    result.message = updated.message;
  }
}

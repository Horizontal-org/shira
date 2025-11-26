import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import * as crypto from "crypto";
import { AssignLearnerDto } from "../dto/assign.learner.dto";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { IAssignLearnerService } from "../interfaces/services/assign.learner.service.interface";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import { AssignmentEmailSendFailedException } from "../exceptions/assignment-email-send.learner.exception";
import { QuizAssignmentFailedException } from "../exceptions";
import { LearnerOperationResponse } from "../dto/learner-operation-response.dto";

@Injectable()
export class AssignLearnerService implements IAssignLearnerService {

  constructor(
    private readonly dataSource: DataSource,
    @InjectQueue("emails")
    private readonly emailsQueue: Queue
  ) { }

  async assign(
    assignLearnerDto: AssignLearnerDto,
    spaceId: number
  ): Promise<LearnerOperationResponse[]> {
    const { learners } = assignLearnerDto;

    const okResults: Array<{ learnerQuiz: LearnerQuizEntity; email: string; quizId: number }> = [];

    const results = await Promise.all(
      learners.map(async ({ email, quizId }): Promise<LearnerOperationResponse> => {
        try {
          const learnerQuiz = await this.assignLearner(email, quizId, spaceId);

          if (!learnerQuiz) {
            return this.createResponse(
              email,
              quizId,
              "Error",
              "Learner not found in space or already assigned to quiz"
            );
          }

          okResults.push({ learnerQuiz, email, quizId });
          return this.createResponse(email, quizId, "OK");

        } catch (err) {
          return this.createResponse(email, quizId, "Error", err?.message ?? "Unknown assignment error");
        }
      })
    );

    await Promise.all(
      okResults.map(async ({ learnerQuiz, email, quizId }) => {
        try {
          await this.sendEmail(learnerQuiz, email);
        } catch (err) {
          this.updateAssignmentStatusOnEmailError(results, email, quizId, err?.message);
        }
      })
    );

    return results;
  }

  private async assignLearner(
    email: string,
    quizId: number,
    spaceId: number
  ): Promise<LearnerQuizEntity | undefined> {
    const learnerQuiz = await this.dataSource.transaction(async (manager) => {
      const learnerRepo = manager.getRepository(LearnerEntity);

      const learner = await learnerRepo
        .createQueryBuilder("learner")
        .leftJoin(
          "learner.learnerQuizzes",
          "learnerQuiz",
          "learnerQuiz.quiz_id = :quizId", { quizId }
        )
        .where("learner.email = :email", { email })
        .andWhere("learner.space_id = :spaceId", { spaceId })
        .andWhere("learnerQuiz.id IS NULL")
        .getOne();

      if (!learner) return;

      return await this.saveLearner(learner.id, quizId, manager);
    });

    if (!learnerQuiz) return;

    return learnerQuiz;
  }

  private async saveLearner(
    learnerId: number,
    quizId: number,
    manager: EntityManager
  ): Promise<LearnerQuizEntity> {
    const learnerQuizRepo = manager.getRepository(LearnerQuizEntity);

    const learnerQuiz = learnerQuizRepo.create({
      learnerId,
      quizId,
      hash: crypto.randomBytes(20).toString("hex"),
      status: "assigned",
      assignedAt: new Date(),
    });

    try {
      return await learnerQuizRepo.save(learnerQuiz);
    } catch {
      throw new QuizAssignmentFailedException();
    }
  }

  private async sendEmail(learnerQuiz: LearnerQuizEntity, email: string): Promise<void> {
    const magicLink = `${process.env.PUBLIC_URL}/learner-quiz/${learnerQuiz.hash}`;

    try {
      await this.emailsQueue.add("send", {
        to: email,
        from: process.env.SMTP_GLOBAL_FROM,
        subject: "Invitation to take a quiz in a Shira space",
        template: "learner-quiz-assignment",
        data: { email, magicLink },
      });
    } catch {
      throw new AssignmentEmailSendFailedException();
    }
  }

  private createResponse(
    email: string,
    quizId: number,
    status: "OK" | "Error",
    message?: string
  ): LearnerOperationResponse {
    return {
      email,
      quizId,
      status,
      ...(message ? { message } : {})
    };
  }

  private updateAssignmentStatusOnEmailError(
    results: LearnerOperationResponse[],
    email: string,
    quizId: number,
    errorMessage?: string
  ) {
    const result = results.find((r) => r.email === email && r.quizId === quizId);
    if (!result) return;

    const updated = this.createResponse(
      email,
      quizId,
      "Error",
      errorMessage ?? "Unknown error while sending assignment email"
    );

    result.status = updated.status;
    result.message = updated.message;
  }
}

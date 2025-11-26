import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UnassignLearnerDto } from "../dto/unassign.learner.dto";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { IUnassignLearnerService } from "../interfaces/services/unassign.learner.service.interface";
import { LearnerOperationResponse } from "../dto/learner-operation-response.dto";

@Injectable()
export class UnassignLearnerService implements IUnassignLearnerService {
  constructor(
    private dataSource: DataSource,
  ) { }

  async unassign(unassignLearnerDto: UnassignLearnerDto, spaceId: number): Promise<LearnerOperationResponse[]> {
    const { learners } = unassignLearnerDto;

    const results = await Promise.all(
      learners.map(async ({ email, quizId }): Promise<LearnerOperationResponse> => {
        try {
          const removed = await this.unassignLearner(email, quizId, spaceId);

          if (!removed) {
            return this.createResponse(email, quizId, "Error", "Learner not found in space or not assigned to quiz");
          }

          return this.createResponse(email, quizId, "OK");
        } catch (err) {
          return this.createResponse(email, quizId, "Error", err?.message ?? "Unknown unassignment error");
        }
      })
    );

    return results;
  }

  private async unassignLearner(email: string, quizId: number, spaceId: number): Promise<boolean> {
    return await this.dataSource.transaction(async (manager) => {
      const learnerQuizRepo = manager.getRepository(LearnerQuizEntity);

      const learnerQuiz = await learnerQuizRepo
        .createQueryBuilder('learnerQuiz')
        .innerJoin('learnerQuiz.learner', 'learner')
        .where('learner.email = :email', { email })
        .andWhere('learner.space_id = :spaceId', { spaceId })
        .andWhere('learnerQuiz.quiz_id = :quizId', { quizId })
        .getOne();

      if (!learnerQuiz) return false;

      await learnerQuizRepo.remove(learnerQuiz);
      return true;
    });
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
}

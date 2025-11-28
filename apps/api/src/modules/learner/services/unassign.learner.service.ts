import { Injectable } from "@nestjs/common";
import { DataSource, In } from "typeorm";
import { LearnerToBeUnassigned, UnassignLearnerDto } from "../dto/unassign.learner.dto";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { IUnassignLearnerService } from "../interfaces/services/unassign.learner.service.interface";
import { ApiLogger } from "../logger/api-logger.service";
import { QuizUnassignmentFailedException } from "../exceptions/unassign-quiz.learner.exception";

@Injectable()
export class UnassignLearnerService implements IUnassignLearnerService {
  constructor(
    private readonly dataSource: DataSource,
  ) { }

  private readonly logger = new ApiLogger(UnassignLearnerService.name);

  async unassign(unassignLearnerDto: UnassignLearnerDto, spaceId: number): Promise<void> {
    const { learners } = unassignLearnerDto;

    this.logger.log(`Unassigning ${learners.length} learners from quizzes in space ${spaceId}`);

    await this.dataSource.transaction(async (manager) => {
      const learnerQuizRepo = manager.getRepository(LearnerQuizEntity);

      const learnerQuizzes = await this.fetchLearnerQuizzes(learnerQuizRepo, learners, spaceId);

      this.validateLearnerQuizzes(learnerQuizzes, spaceId, learners);

      await learnerQuizRepo.remove(learnerQuizzes);

      this.logger.log(
        `Successfully unassigned ${learnerQuizzes.length} learners from quizzes in space ${spaceId}`
      );
    });
  }

  private async fetchLearnerQuizzes(learnerQuizRepo, learners: LearnerToBeUnassigned[], spaceId: number) {
    return await learnerQuizRepo.find({
      where: {
        quiz: In(learners.map(({ quizId }) => quizId)),
        learner: {
          id: In(learners.map(({ learnerId }) => learnerId)),
          space: { id: spaceId }
        },
      }
    });
  }

  private validateLearnerQuizzes(learnerQuizzes, spaceId: number, learners: LearnerToBeUnassigned[]) {
    if (learnerQuizzes.length === 0) {
      this.logger.error(`No learner quizzes found for unassignment in space ${spaceId}`);
      throw new QuizUnassignmentFailedException();
    }

    if (learnerQuizzes.length !== learners.length) {
      this.logger.error(`Learner quizzes and unassignment request size mismatch in space ${spaceId}`);
      throw new QuizUnassignmentFailedException();
    }
  }
}

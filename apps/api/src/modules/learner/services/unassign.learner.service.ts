import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UnassignLearnerDto } from "../dto/unassign.learner.dto";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { IUnassignLearnerService } from "../interfaces/services/unassign.learner.service.interface";

@Injectable()
export class UnassignLearnerService implements IUnassignLearnerService {
  constructor(
    private readonly dataSource: DataSource,
  ) { }

  async unassign(unassignLearnerDto: UnassignLearnerDto, spaceId: number): Promise<void> {
    const { learners } = unassignLearnerDto;

    try {
      await this.dataSource.transaction(async (manager) => {
        const learnerQuizRepo = manager.getRepository(LearnerQuizEntity);

        for (const { email, quizId } of learners) {
          const learnerQuiz = await learnerQuizRepo
            .createQueryBuilder("learnerQuiz")
            .innerJoin("learnerQuiz.learner", "learner")
            .where("learner.email = :email", { email })
            .andWhere("learner.space_id = :spaceId", { spaceId })
            .andWhere("learnerQuiz.quiz_id = :quizId", { quizId })
            .getOne();

          if (!learnerQuiz) { throw new Error(); }

          await learnerQuizRepo.remove(learnerQuiz);
        }
      });
    } catch (err) {
      console.error("Error during unassignment process:", err);
      throw err;
    }
  }
}

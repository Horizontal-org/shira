import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UnassignLearnerDto } from "../dto/unassign.learner.dto";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { IUnassignLearnerService } from "../interfaces/services/unassign.learner.service.interface";

@Injectable()
export class UnassignLearnerService implements IUnassignLearnerService {
  constructor(
    private dataSource: DataSource,
  ) { }

  async unassign(unassignLearnerDto: UnassignLearnerDto, spaceId: number): Promise<void> {
    const { learners } = unassignLearnerDto;

    await Promise.all(
      learners.map(({ email, quizId }) =>
        this.unassignLearner(email, quizId, spaceId).catch((err) => {
          console.error(`Failed unassigning ${email}:`, err);
        })
      )
    );
  }

  private async unassignLearner(email: string, quizId: number, spaceId: number) {
    await this.dataSource.transaction(async (manager) => {
      const learnerQuizRepo = manager.getRepository(LearnerQuizEntity);

      const learnerQuiz = await learnerQuizRepo
        .createQueryBuilder('learnerQuiz')
        .innerJoin('learnerQuiz.learner', 'learner')
        .where('learner.email = :email', { email })
        .andWhere('learner.space_id = :spaceId', { spaceId })
        .andWhere('learnerQuiz.quiz_id = :quizId', { quizId })
        .getOne();

      if (!learnerQuiz) return;

      await learnerQuizRepo.remove(learnerQuiz);
    });
  }
}

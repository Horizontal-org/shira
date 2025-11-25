import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import * as crypto from 'crypto';
import { AssignLearnerDto } from "../dto/assign.learner.dto";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { IAssignLearnerService } from "../interfaces/services/assign.learner.service.interface";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import { AssignmentEmailSendFailedException } from "../exceptions/assignment-email-send.learner.exception";

@Injectable()
export class AssignLearnerService implements IAssignLearnerService {
  constructor(
    private dataSource: DataSource,
    @InjectQueue('emails')
    private emailsQueue: Queue
  ) { }

  async assign(assignLearnerDto: AssignLearnerDto, spaceId: number): Promise<void> {
    const { learners } = assignLearnerDto;

    for (const { email, quizId } of learners) {
      await this.assignLearner(email, quizId, spaceId);
    }
  }

  private async assignLearner(email: string, quizId: number, spaceId: number) {

    const learnerQuiz = await this.dataSource.transaction(async (manager) => {
      const learnerRepo = manager.getRepository(LearnerEntity);

      const learner = await learnerRepo
        .createQueryBuilder('learner')
        .leftJoin(
          'learner.learnerQuizzes',
          'learnerQuiz',
          'learnerQuiz.quiz_id = :quizId', { quizId }
        )
        .where('learner.email = :email', { email })
        .andWhere('learner.space_id = :spaceId', { spaceId })
        .andWhere('learnerQuiz.id IS NULL')
        .getOne();

      if (!learner) return;

      return await this.saveLearner(learner.id, quizId, manager);
    });

    if (!learnerQuiz) return;

    await this.sendEmail(learnerQuiz, email);
  }

  async saveLearner(learnerId: number, quizId: number, manager: EntityManager) {
    const repo = manager.getRepository(LearnerQuizEntity);

    const learnerQuiz = repo.create({
      learnerId,
      quizId,
      hash: crypto.randomBytes(20).toString('hex'),
      status: 'assigned',
      assignedAt: new Date(),
    });

    return await repo.save(learnerQuiz);
  }

  private async sendEmail(learnerQuiz: LearnerQuizEntity, email: string) {
    const magicLink = `${process.env.PUBLIC_URL}/learner-quiz/${learnerQuiz.hash}`;

    try {
      await this.emailsQueue.add('send', {
        to: email,
        from: process.env.SMTP_GLOBAL_FROM,
        subject: 'Invitation to take a quiz in a Shira space',
        template: 'learner-quiz-assignment',
        data: { email, magicLink }
      })
    } catch {
      throw new AssignmentEmailSendFailedException();
    }
  }
}

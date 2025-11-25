import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as crypto from 'crypto';
import { AssignLearnerDto } from "../dto/assign.learner.dto";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { IAssignLearnerService } from "../interfaces/services/assign.learner.service.interface";
import { QuizAssignmentFailedException } from "../exceptions/assign-quiz.learner.exception";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import { AssignmentEmailSendFailedException } from "../exceptions/assignment-email-send.learner.exception";

@Injectable()
export class AssignLearnerService implements IAssignLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private learnerRepo: Repository<LearnerEntity>,
    @InjectRepository(LearnerQuizEntity)
    private learnerQuizRepo: Repository<LearnerQuizEntity>,
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
    const learner = await this.learnerRepo
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

    const learnerQuiz = await this.saveLearner(learner.id, quizId);
    await this.sendEmail(learnerQuiz, email);
  }

  private async saveLearner(learnerId: number, quizId: number) {
    console.debug("AssignLearnerService ~ saveLearner ~ learnerId:", learnerId, "quizId:", quizId);

    try {
      const learnerQuiz = this.learnerQuizRepo.create({
        learnerId: learnerId,
        quizId,
        hash: crypto.randomBytes(20).toString('hex'),
        status: 'assigned',
        assignedAt: new Date(),
      });

      return await this.learnerQuizRepo.save(learnerQuiz);
    } catch {
      throw new QuizAssignmentFailedException();
    }
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

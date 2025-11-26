import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as crypto from 'crypto';
import { AssignLearnerDto } from "../dto/assign.learner.dto";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { IAssignLearnerService } from "../interfaces/services/assign.learner.service.interface";
import { NotFoundLearnerException, QuizAssignmentAlreadyExistsException, QuizAssignmentFailedException, AssignmentEmailSendFailedException } from "../exceptions";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import { ApiLogger } from "../logger/api-logger.service";

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

  private logger = new ApiLogger(AssignLearnerService.name);

  async assign(assignLearnerDto: AssignLearnerDto, spaceId: number): Promise<void> {
    const { email, quizId } = assignLearnerDto;

    const learner = await this.findLearner(email, quizId, spaceId);

    const learnerQuiz = await this.saveLearner(learner.id, quizId);

    await this.sendEmail(learnerQuiz, email);
  }

  private async findLearner(email: string, quizId: number, spaceId: number) {
    this.logger.log(`Finding learner with email: ${email} in spaceId: ${spaceId}`);

    const learner = await this.learnerRepo.findOne({
      where: {
        email,
        space: { id: spaceId }
      }
    });

    if (!learner) throw new NotFoundLearnerException();

    this.logger.log(`Learner found with ID: ${learner.id}`);

    const quizAssignmentExists = await this.learnerQuizRepo.exists({
      where: {
        learner: { id: learner.id },
        quiz: { id: quizId },
      },
    });

    if (quizAssignmentExists) {
      throw new QuizAssignmentAlreadyExistsException();
    }

    return learner;
  }

  private async saveLearner(learnerId: number, quizId: number) {
    this.logger.log(`Saving learner quiz assignment
      for learnerId: ${learnerId},
      quizId: ${quizId}`);

    try {
      const learnerQuiz = this.learnerQuizRepo.create({
        learnerId: learnerId,
        quizId,
        hash: crypto.randomBytes(20).toString('hex'),
        status: 'assigned',
        assignedAt: new Date(),
      });

      const savedLearner = await this.learnerQuizRepo.save(learnerQuiz);
      this.logger.log(`Learner quiz assignment saved with ID: ${savedLearner.id}`);

      return savedLearner
    } catch {
      throw new QuizAssignmentFailedException();
    }
  }

  private async sendEmail(learnerQuiz: LearnerQuizEntity, email: string) {
    this.logger.log(`Sending assignment email to learner
      with email: ${email}
      for quizId: ${learnerQuiz.quizId}
      in spaceId: ${learnerQuiz.quiz.space.id}`);

    const magicLink = `${process.env.PUBLIC_URL}/learner-quiz/${learnerQuiz.hash}`;

    try {
      await this.emailsQueue.add('send', {
        to: email,
        from: process.env.SMTP_GLOBAL_FROM,
        subject: 'Invitation to take a quiz in a Shira space',
        template: 'learner-quiz-assignment',
        data: { email, magicLink }
      })
      this.logger.log(`Assignment email queued successfully for email: ${email}`);
    } catch {
      throw new AssignmentEmailSendFailedException();
    }
  }
}

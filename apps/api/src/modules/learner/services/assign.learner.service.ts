import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as crypto from 'crypto';
import { AssignLearnerDto } from "../dto/assign.learner.dto";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { IAssignLearnerService } from "../interfaces/services/assign.learner.service.interface";
import { NotFoundLearnerException, QuizAssignmentAlreadyExistsException } from "../exceptions";
import { QuizAssignmentFailedException } from "../exceptions/assign-quiz.learner.exception";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import { AssignmentEmailSendFailedException } from "../exceptions/assignment-email-send.learner.exception";
import { NotFoundQuizException } from "../exceptions/not-found-quiz.learner.exception";

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
    const { email, quizId } = assignLearnerDto;

    const learner = await this.findLearner(email, quizId, spaceId);

    await this.saveLearner(learner.id, quizId);
    await this.sendEmail(email, quizId, spaceId);
  }

  private async findLearner(email: string, quizId: number, spaceId: number) {
    console.debug("AssignLearnerService ~ findLearner ~ email:", email, "spaceId:", spaceId);

    const learner = await this.learnerRepo.findOne({
      where: {
        email,
        space: { id: spaceId }
      },
      relations: ['learnerQuizzes']
    });

    if (!learner) throw new NotFoundLearnerException();

    console.debug("AssignLearnerService ~ findLearner ~ learner:", learner.id);

    if (learner.learnerQuizzes.some(lq => lq.quizId === quizId)) {
      throw new QuizAssignmentAlreadyExistsException();
    }

    return learner;
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

      await this.learnerQuizRepo.save(learnerQuiz);
    } catch {
      throw new QuizAssignmentFailedException();
    }
  }

  private async sendEmail(email: string, quizId, spaceId: number) {
    console.debug("AssignLearnerService ~ sendEmail ~ email:", email, "spaceId:", spaceId);

    const learnerQuiz = await this.learnerQuizRepo.findOne({
      where: { learner: { email }, quiz: { id: quizId, space: { id: spaceId } } },
      relations: ['quiz', 'learner']
    });

    if (!learnerQuiz) throw new NotFoundQuizException();

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

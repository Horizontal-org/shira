import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as crypto from 'crypto';
import { AssignLearnerDto } from "../dto/assign.learner.dto";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { IAssignLearnerService } from "../interfaces/services/assign.learner.service.interface";
import { NotFoundLearnerException } from "../exceptions";
import { AssignToQuizException } from "../exceptions/assign-quiz.learner.exception";
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
    const { email, quizId } = assignLearnerDto;

    const learner = await this.learnerRepo.findOne({
      where: {
        email,
        space: { id: spaceId }
      }
    });

    if (!learner) throw new NotFoundLearnerException();

    console.debug("AssignLearnerService ~ assign ~ email:", email,
      "spaceId:", spaceId, "quizId:", quizId, "learnerId:", learner.id);

    try {
      const learnerQuiz = this.learnerQuizRepo.create({
        learnerId: learner.id,
        quizId,
        hash: crypto.randomBytes(20).toString('hex'),
        status: 'assigned',
        assignedAt: new Date(),
      });

      await this.learnerQuizRepo.save(learnerQuiz);
    } catch (err) {
      console.error('AssignLearnerService ~ error assigning quiz to learner', { email, spaceId, quizId, err });
      throw new AssignToQuizException();
    }
  }

  async sendEmail(email: string, spaceId: number, token: string) {
    console.debug("AssignLearnerService ~ sendEmail ~ email:", email, "spaceId:", spaceId);

    const magicLink = `${process.env.PUBLIC_URL}/accept-quiz-assignment/${token}`;

    try {
      await this.emailsQueue.add('send', {
        to: email,
        from: process.env.SMTP_GLOBAL_FROM,
        subject: 'Invitation to take a quiz in a Shira space',
        template: 'learner-quiz-assignment',
        data: { email, magicLink, spaceId }
      })
    } catch (err) {
      console.error('AssignLearnerService ~ error sending quiz assignment email', { err });
      throw new AssignmentEmailSendFailedException();
    }
  }
}

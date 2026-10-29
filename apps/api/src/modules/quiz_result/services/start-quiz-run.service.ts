import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { StartQuizRunDto } from '../dto/start-quiz-run.dto';
import { QuizRun } from '../domain/quiz_runs.entity';
import { Quiz } from '../../quiz/domain/quiz.entity';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { LearnerQuiz } from 'src/modules/learner/domain/learners_quizzes.entity';
import { isLearnerQuizLinkExpired } from 'src/modules/learner/domain/learner-quiz-link';
import { IStartQuizRunService, StartedQuizRun } from '../interfaces/services/start-quiz-run.service.interface';
import { RecordUsageEnqueueQuizResultException } from '../exceptions/record-usage-enqueue.quiz-result.exception';
import { SELF_HOSTED } from 'src/utils/environment/self-hosted.environment';
import { hashToken } from 'src/utils/token.utils';

@Injectable()
export class StartQuizRunService implements IStartQuizRunService {

  constructor(
    @InjectRepository(QuizRun)
    private readonly quizRunRepo: Repository<QuizRun>,
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
    @InjectRepository(LearnerQuiz)
    private readonly learnerQuizRepo: Repository<LearnerQuiz>,
    @InjectQueue("payments")
    private readonly paymentsQueue: Queue,
  ) { }

  async execute(dto: StartQuizRunDto): Promise<StartedQuizRun> {
    const { quiz, learnerId } = await this.resolveByHash(dto.hash)

    if (learnerId) {
      // record sub usage
      if (!SELF_HOSTED) {
        // comment record usage for now
        // this.recordUsage(quiz.space.organizationId);
      }
    }

    const token = crypto.randomBytes(32).toString('hex');

    const run = await this.quizRunRepo.save(this.quizRunRepo.create({
      quizId: quiz.id,
      learnerId,
      startedAt: new Date(dto.startedAt),
      tokenHash: hashToken(token),
    }));

    return {
      id: run.id,
      quizId: run.quizId,
      learnerId: run.learnerId,
      startedAt: run.startedAt,
      token,
    };
  }

  private async resolveByHash(hash: string): Promise<{ quiz: Quiz, learnerId: number | null }> {
    const learnerQuiz = await this.learnerQuizRepo.findOne({
      where: { hash },
      relations: ['quiz', 'quiz.space', 'learner'],
    })

    if (learnerQuiz) {
      const isValid = learnerQuiz.status === 'assigned'
        && learnerQuiz.learner?.status === 'registered'
        && learnerQuiz.quiz?.published
        && !isLearnerQuizLinkExpired(learnerQuiz)

      if (!isValid) throw new NotFoundException('Quiz not found')

      return { quiz: learnerQuiz.quiz, learnerId: learnerQuiz.learnerId }
    }

    const quiz = await this.quizRepo.findOne({
      where: { hash, published: true, visibility: 'public' },
      relations: ['space'],
    })

    if (!quiz) throw new NotFoundException('Quiz not found')

    return { quiz, learnerId: null }
  }

  // private async recordUsage(orgId: number) {
  //   try {
  //     await this.paymentsQueue.add('record-usage', String(orgId))
  //   } catch (error) {
  //     throw new RecordUsageEnqueueQuizResultException(String(orgId), error)
  //   }
  // }
}

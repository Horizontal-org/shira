import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StartQuizRunDto } from '../dto/start-quiz-run.dto';
import { QuizRun } from '../domain/quiz_runs.entity';
import { Quiz } from '../../quiz/domain/quiz.entity';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { LearnerQuiz } from 'src/modules/learner/domain/learners_quizzes.entity';
import { TYPES as LEARNER_TYPES } from '../../learner/interfaces'
import { IValidateLearnerQuizService } from 'src/modules/learner/interfaces/services/validate.learner-quiz.service.interface';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';

@Injectable()
export class StartQuizRunService {
  constructor(
    @InjectRepository(QuizRun)
    private readonly quizRunRepo: Repository<QuizRun>,
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>,
    @InjectQueue("payments")
    private readonly paymentsQueue: Queue,
    @Inject(LEARNER_TYPES.services.IValidateLearnerQuizService)
    private readonly validateLearnerQuiz: IValidateLearnerQuizService
  ) {}

  async execute(dto: StartQuizRunDto): Promise<QuizRun> {
    const quizIdNum = Number(dto.quizId);
    const quiz = await this.quizRepo.findOne({ where: { id: quizIdNum } });

    if (!quiz) {
      throw new Error('Quiz not found');
    }

    if (dto.learnerId) {
      // check learner_quiz ? 
      const learnerQuiz = await this.validateLearnerQuiz.execute(quizIdNum, dto.learnerId)
      const orgId = await this.getOrgByLearnerQuiz(learnerQuiz)
      // record sub usage  
      // this.paymentsQueue.add('record-usage', orgId)

    }  

    const run = this.quizRunRepo.create({
      quizId: quizIdNum,
      learnerId: dto.learnerId ?? null,
      startedAt: new Date(dto.startedAt),
    });

    return this.quizRunRepo.save(run);
  }

  private  getOrgByLearnerQuiz = async (learnerQuiz: LearnerQuiz) => {
    console.log("🚀 ~ StartQuizRunService ~ learnerQuiz:", learnerQuiz)
    
    // const space = await this.spaceRepo.findOneOrFail({
    //   where: { id: learnerQuiz.quiz. }
    //   relations: ['quiz', 'learner']
    // })
  }
}

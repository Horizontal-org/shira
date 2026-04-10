import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { IValidateCreateQuizService } from '../interfaces/services/validate-create.quiz.service.interface';
import { CachedSubscription } from 'src/modules/subscription/dto/cached-response.dto';
import { SubscriptionRequiredException } from 'src/modules/subscription/exceptions';


@Injectable()
export class ValidateCreateQuizService implements IValidateCreateQuizService {

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
  ) {}

  async execute (
    sub,
    visibility,
    spaceId,
  ) {
    const quizCount = await this.quizRepo
      .createQueryBuilder('quiz')
      .where('space_id = :spaceId', { spaceId: spaceId })
      .andWhere('visibility = "public"')
      .getCount()

    if (quizCount >= 3 || visibility === 'private') {
      this.checkSub(sub)
    }
  }

  private checkSub = (sub: CachedSubscription) => {
    if (!sub || sub.status !== 'active' || sub.type !== 'pro') {
      throw new SubscriptionRequiredException()
    }
  } 
}


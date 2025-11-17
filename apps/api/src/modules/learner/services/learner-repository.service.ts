import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError, UpdateResult } from 'typeorm';
import { Learner as LearnerEntity } from '../domain/learner.entity';
import { MySqlCode } from '../db-error';
import { EmailAlreadyTakenException } from '../exceptions/email.exceptions';
import { ConflictLearnerException, SavingLearnerException } from '../exceptions';

@Injectable()
export class LearnerRepositoryService {
  constructor(
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
  ) { }

  public async create(learner: Partial<LearnerEntity>): Promise<LearnerEntity> {
    try {
      return this.learnerRepo.create(learner);
    } catch (err: unknown) {
      if (err instanceof QueryFailedError) {
        const { code } = err as any;

        if (code === MySqlCode.DUPLICATED_ENTRY) {
          throw new ConflictLearnerException(learner.id.toString());
        }

        throw new SavingLearnerException();
      }
    }
  }

  public async save(learner: Partial<LearnerEntity>): Promise<LearnerEntity> {
    try {
      return await this.learnerRepo.save(learner as Partial<LearnerEntity>);
    } catch (err: unknown) {
      if (err instanceof QueryFailedError) {
        const { code } = err as any;

        if (code === MySqlCode.DUPLICATED_ENTRY) {
          throw new ConflictLearnerException(learner.id.toString());
        }

        throw new SavingLearnerException();
      }
    }
  }

  public async update(params: any, learner: LearnerEntity,): Promise<UpdateResult> {
    try {
      return await this.learnerRepo.update(params, learner);
    } catch (err: unknown) {
      if (err instanceof QueryFailedError) {
        const { code } = err as any;

        if (code === MySqlCode.DUPLICATED_ENTRY) {
          throw new ConflictLearnerException(learner.id.toString());
        }
      }

      throw new SavingLearnerException();
    }
  }

  async findOne(param: any): Promise<LearnerEntity> {
    try {
      return await this.learnerRepo.findOne(param);
    } catch (err: unknown) {
      if (err instanceof QueryFailedError) {
        const { code } = err as any;

        if (code === MySqlCode.DUPLICATED_ENTRY) {
          throw new EmailAlreadyTakenException(param.email);
        }
      }

      throw new SavingLearnerException();
    }
  }

}

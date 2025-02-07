import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FieldOfWork } from 'src/modules/field_of_work/domain';

/**
 * Service dealing with app based operations.
 *
 * @class
 */
@Injectable()
export class FieldOfWorkSeederService {
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Repository<FieldOfWork>} fieldOfWorkRepository
   */
  constructor(
    @InjectRepository(FieldOfWork)
    private readonly fieldOfWorkRepository: Repository<FieldOfWork>,
  ) {}
  async create(): Promise<void> {
    await this.fieldOfWorkRepository.save([
      {
        name: 'Human resources',
        slug: 'human-resources',
      },
      {
        name: 'Activist',
        slug: 'activist',
      },
    ]);
  }
}

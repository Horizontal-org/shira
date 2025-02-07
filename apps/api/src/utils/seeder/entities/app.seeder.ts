import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from '../../../modules/app/domain';
import { Repository } from 'typeorm';

/**
 * Service dealing with app based operations.
 *
 * @class
 */
@Injectable()
export class AppSeederService {
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Repository<App>} appRepository
   */
  constructor(
    @InjectRepository(App)
    private readonly appRepository: Repository<App>,
  ) {}
  async create(): Promise<void> {
    await this.appRepository.save([
      {
        name: 'Gmail',
        type: 'email'
      },
      {
        name: 'Whatsapp',
        type: 'messaging'
      },
      {
        name: 'SMS',
        type: 'messaging'
      },
    ]);
  }
}

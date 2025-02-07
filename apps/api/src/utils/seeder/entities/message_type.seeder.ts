import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageType } from '../../../modules/message_type/domain';
import { Repository } from 'typeorm';
import { App } from 'src/modules/app/domain';

/**
 * Service dealing with app based operations.
 *
 * @class
 */
@Injectable()
export class MessageTypeSeederService {
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Repository<MessageType>} messageTypeRepository
   * @param {Repository<App>} appRepository
   */
  constructor(
    @InjectRepository(MessageType)
    private readonly messageTypeRepository: Repository<MessageType>,
    @InjectRepository(App)
    private readonly appRepository: Repository<App>,
  ) {}
  async create(): Promise<void> {
    const whatsappApp = await this.appRepository.findOne({ where: { name: 'Whatsapp' } });
    const gmailApp = await this.appRepository.findOne({ where: { name: 'Gmail' } });

    // await this.messageTypeRepository.save([
    //   {
    //     name: 'Job offer',
    //     slug: 'job-offer',
    //     app: whatsappApp,
    //   },
    //   {
    //     name: 'Grandmother',
    //     slug: 'grandmother',
    //     app: whatsappApp,
    //   },
    //   {
    //     name: 'Loan approval',
    //     slug: 'loan-approval',
    //     app: gmailApp,
    //   },
    // ]);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { AppSeederService } from './entities/app.seeder';
import { FieldOfWorkSeederService } from './entities/field_of_work.seeder';
import { MessageTypeSeederService } from './entities/message_type.seeder';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly appSeederService: AppSeederService,
    private readonly fieldOfWorkSeederService: FieldOfWorkSeederService,
  ) {}
  async seed() {
    const list = {
      app: this.appSeederService,
      // messageType: this.messageTypeSeederService,
      fieldOfWork: this.fieldOfWorkSeederService,
    };

    const listKeys = Object.keys(list);
    for (let i = 0; i < listKeys.length; i++) {
      await list[listKeys[i]].create();
      this.logger.debug(`${listKeys[i]} seeded`);
    }
  }
}

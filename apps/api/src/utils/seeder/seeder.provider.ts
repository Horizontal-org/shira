import { Injectable, Logger } from '@nestjs/common';
import { AppSeederService } from './entities/app.seeder';
import { FieldOfWorkSeederService } from './entities/field_of_work.seeder';
import { MessageTypeSeederService } from './entities/message_type.seeder';
import { PlanSeederService } from './entities/plans.seeder';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly appSeederService: AppSeederService,
    private readonly fieldOfWorkSeederService: FieldOfWorkSeederService,
    private readonly planSeederService: PlanSeederService
  ) {}
  async seed() {
    const list = {
      app: this.appSeederService,
      // messageType: this.messageTypeSeederService,
      // fieldOfWork: this.fieldOfWorkSeederService,
      plans: this.planSeederService
    };

    const listKeys = Object.keys(list);
    for (let i = 0; i < listKeys.length; i++) {
      await list[listKeys[i]].create();
      this.logger.debug(`${listKeys[i]} seeded`);
    }
  }
}

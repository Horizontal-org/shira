import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject } from '@nestjs/common';
import { Job } from 'bullmq';
import { TYPES as TYPES_SUBS } from '../../subscription/interfaces';
import { IShiraPaymentsService } from 'src/modules/subscription/interfaces/services/shira-payments.service.interface';

@Processor('payments')
export class PaymentsProcessor extends WorkerHost {

  constructor(
    @Inject(TYPES_SUBS.services.IShiraPaymentsService)
    private paymentsService: IShiraPaymentsService,
  ) {
    super()
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'record-usage': {
        await this.paymentsService.recordUsage(job.data)
      }
    }
  }

}
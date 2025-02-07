import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject } from '@nestjs/common';
import { Job } from 'bullmq';
import { TYPES as TYPES_EMAIL } from '../../email/interfaces';
import { IEmailService } from 'src/modules/email/interfaces/services/email.service.interface';


@Processor('emails')
export class EmailsProcessor extends WorkerHost {

    constructor(  
      @Inject(TYPES_EMAIL.services.IEmailService)
      private mailService: IEmailService,          
    ) {
      super()
    }

    async process(job: Job<any, any, string>): Promise<any> {
      switch (job.name) {
        case 'send': {
          console.log('SEND EMAIL', job)
          await this.mailService.send(job.data)
        }
      }
    }

}
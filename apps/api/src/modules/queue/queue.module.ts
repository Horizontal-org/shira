import { BullModule } from "@nestjs/bullmq";
import { Global, Module } from "@nestjs/common";
import { EmailsProcessor } from "./processors/emails.processor";
import { EmailModule } from "../email/email.module";

@Global()
@Module({
  imports: [    
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'redis',
        port: 6379,
        password: process.env.REDIS_PASSWORD
      },
    }),
    BullModule.registerQueue(
      { name: 'emails' },
    ),
    EmailModule,
  ],
  providers: [
    EmailsProcessor,
  ],
  exports: [
    BullModule,
  ]
})
export class QueueModule {}

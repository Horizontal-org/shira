
import { Module } from '@nestjs/common';
import { 
    emailServiceProvider,
    servicesPassphraseProviders,
} from './email.providers';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false,
        debug: true,
        logger: true,
        // direct:true,
        requireTLS: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        } 
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(process.cwd(), '/src/templates/pages'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
      options: {
        partials: {
          dir: join(process.cwd(), '/src/templates/partials'),
          options: {
            strict: true,
          },
        },
      },
    }),
  ],
  providers: [
    ...servicesPassphraseProviders
  ],
  exports: [
    emailServiceProvider,    
  ]
})

export class EmailModule {}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public async send(params) {
    console.log('SENDING EMAIL => ', params)
    try {
      await this.mailerService
        .sendMail({
          to: params.to, // list of receivers
          from: process.env.SMTP_GLOBAL_FROM, // sender address
          subject: params.subject, // Subject line
          template: params.template,
          context: { ...params.data }, 
        })      
    } catch (e) {
      console.log(
        'ERROR AT EMAIL SEND => ',
        e,
      )
      throw new InternalServerErrorException()
    }
  }

  private getPath() {
    return join(process.cwd(), `/src/`);
  }
}

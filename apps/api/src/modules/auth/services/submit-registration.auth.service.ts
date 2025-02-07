import { Injectable } from '@nestjs/common';

import * as crypto from 'crypto'
import { ISubmitRegistrationAuthService } from '../interfaces';
import { RegisterAuthDto } from '../domain/register.auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationEntity } from '../domain/registration.entity';
import { Repository } from 'typeorm';
import { addDays } from 'date-fns';
import { hashPassword } from 'src/utils/password.utils';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class SubmitRegistrationAuthService implements ISubmitRegistrationAuthService {
  constructor(
    @InjectRepository(RegistrationEntity)
    private readonly regRepo: Repository<RegistrationEntity>,
    @InjectQueue('emails')
    private emailsQueue: Queue
  ) {}

  async execute(data: RegisterAuthDto): Promise<void> {
    const registration = new RegistrationEntity()

    //TODO CHECK TIMEZONES createdAt !== expiresAt
  
    const expiresAt = addDays(new Date(), 1) ;

    registration.email = data.email
    registration.passphrase = data.passphrase
    registration.password = await hashPassword(data.password)
    registration.spaceName = data.spaceName    
    registration.expiresAt = expiresAt
    registration.invitationHash = crypto.randomBytes(20).toString('hex') 

    await this.regRepo.save(registration)

    this.emailsQueue.add('send', {
      to: registration.email,
      from: process.env.SMTP_GLOBAL_FROM, // sender address
      subject: 'CONFIRM REGISTRATION', // Subject line
      template: 'confirm-registration',
      data: { ...registration }
    })

    return
  }
}

import { InjectRepository } from "@nestjs/typeorm";
import { ISendInvitationAuthService } from "../interfaces";
import { PassphraseEntity } from "src/modules/passphrase/domain/passphrase.entity";
import { Repository } from "typeorm";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { Injectable } from "@nestjs/common";
import { SendInvitationDto } from "../domain/send-invitation.dto";
import * as crypto from 'crypto'

@Injectable()
export class SendInvitationAuthService implements ISendInvitationAuthService {
  constructor(
    @InjectRepository(PassphraseEntity)
    private readonly passphraseRepo: Repository<PassphraseEntity>,
    @InjectQueue('emails')
    private emailsQueue: Queue
  ) {}

  async execute(invitationData: SendInvitationDto): Promise<void> {
    const passphrase = new PassphraseEntity()
    passphrase.code = crypto.randomBytes(20).toString('hex');
    passphrase.slug = invitationData.slug
    passphrase.usedBy = invitationData.email // we use this to check the owner of the passphrase

    await this.passphraseRepo.save(passphrase)

    const magicLink = `${process.env.SPACE_URL}/create-space/${passphrase.code}`;

    await this.emailsQueue.add('send', {
      to: invitationData.email,
      from: process.env.SMTP_GLOBAL_FROM,
      subject: 'Invitation to create a Shira space',
      template: 'space-invitation',
      data: {
        email: invitationData.email,
        magicLink: magicLink,
        passphrase: passphrase.code
      }
    })
  }
}
import { InjectRepository } from "@nestjs/typeorm";
import { ISendInvitationAuthService } from "../interfaces";
import { PassphraseEntity } from "src/modules/passphrase/domain/passphrase.entity";
import { Repository } from "typeorm";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { ConflictException, Injectable } from "@nestjs/common";
import { SendInvitationDto } from "../domain/send-invitation.dto";
import { UserEntity } from "src/modules/user/domain/user.entity";
import * as crypto from 'crypto'
import { EmailTakenException } from "../exceptions";

@Injectable()
export class SendInvitationAuthService implements ISendInvitationAuthService {
  constructor(
    @InjectRepository(PassphraseEntity)
    private readonly passphraseRepo: Repository<PassphraseEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectQueue('emails')
    private emailsQueue: Queue
  ) {}

  async execute(invitationData: SendInvitationDto): Promise<void> {
    const { email: invitationEmail, slug } = invitationData

    const existingUser = await this.userRepo.findOne({
      where: { email: invitationEmail }
    });

    if (existingUser) {
      throw new EmailTakenException()
    } 

    const passphrase = new PassphraseEntity()
    passphrase.code = crypto.randomBytes(20).toString('hex');
    passphrase.slug = slug
    passphrase.organizationType = invitationData.orgType
    passphrase.usedBy = invitationEmail // we use this to check the owner of the passphrase

    await this.passphraseRepo.save(passphrase)

    const magicLink = `${process.env.SPACE_URL}/create-space/${passphrase.code}`;

    await this.emailsQueue.add('send', {
      to: invitationEmail,
      from: process.env.SMTP_GLOBAL_FROM,
      subject: 'Invitation to create a Shira space',
      template: 'space-invitation',
      data: {
        email: invitationEmail,
        magicLink: magicLink,
        passphrase: passphrase.code
      }
    })
  }
}
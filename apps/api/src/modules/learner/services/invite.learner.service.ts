import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { InviteLearnerDto } from "../dto/invitation.learner.dto";
import { IInviteLearnerService } from "../interfaces/services/invite.learner.service.interface";
import { EmailSendFailedException } from "../exceptions/email-send.learner.exception";
import { SavingLearnerException as SaveLearnerException } from "../exceptions/save.learner.exception";
import { ConflictLearnerException } from "../exceptions/conflict.learner.exception";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import * as crypto from 'crypto';
import { TokenConflictLearnerException } from "../exceptions/token-conflict.learner.exception";
import { SpaceEntity } from "src/modules/space/domain/space.entity";

@Injectable()
export class InviteLearnerService implements IInviteLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>,
    @InjectQueue('emails')
    private emailsQueue: Queue
  ) { }

  async invite(inviteLearnerDto: InviteLearnerDto, spaceId: number) {
    const { email, name, assignedByUser } = inviteLearnerDto;

    console.debug("InviteLearnerService ~ create ~ email:", email, "spaceId:", spaceId);

    const existing = await this.learnerRepo.findOne({ where: { spaceId, email } });
    if (existing) throw new ConflictLearnerException();

    const hash = crypto.randomBytes(20).toString('hex');

    try {
      const learner = this.learnerRepo.create({
        email,
        name,
        spaceId,
        status: 'invited',
        invitedAt: new Date(),
        invitationToken: hash,
        assignedByUser: assignedByUser ? assignedByUser : null
      });

      await this.learnerRepo.save(learner);
      return { hash: hash, email, spaceId };
    } catch (err) {
      throw new SaveLearnerException();
    }
  }

  async sendEmail(email: string, spaceId: number, token: string) {
    console.debug("InviteLearnerService ~ sendEmail ~ email:", email, "spaceId:", spaceId);

    const magicLink = `${process.env.PUBLIC_URL}/accept-invite/${token}`;

    try {
      await this.emailsQueue.add('send', {
        to: email,
        from: process.env.SMTP_GLOBAL_FROM,
        subject: 'Invitation to register as a Learner in a Shira space',
        template: 'learner-invitation',
        data: { email, magicLink, spaceId }
      })
    } catch (err) {
      throw new EmailSendFailedException();
    }
  }

  async accept(token: string): Promise<string> {
    const learner = await this.learnerRepo.findOne({
      where: { invitationToken: token }
    });

    if (!learner) throw new TokenConflictLearnerException();

    console.debug("InviteLearnerService ~ accept ~ learner:", learner.id, "spaceId:", learner.spaceId);

    const space = await this.spaceRepo.findOne({
      where: { id: learner.spaceId },
      select: { name: true }
    });

    try {
      await this.learnerRepo.update(
        { invitationToken: token },
        { status: 'registered', registeredAt: new Date() }
      );
      return space.name;
    } catch (err) {
      throw new SaveLearnerException();
    }
  }
}
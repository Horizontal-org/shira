import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { InviteLearnerDto } from "../dto/invitation.learner.dto";
import { IInviteLearnerService } from "../interfaces/services/invite.learner.service.interface";
import { SavingLearnerException as SaveLearnerException } from "../exceptions/save.learner.exception";
import { ConflictLearnerException } from "../exceptions/conflict.learner.exception";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import * as crypto from 'crypto';
import { SpaceEntity } from "src/modules/space/domain/space.entity";
import { InvitationEmailSendFailedException } from "../exceptions/invitation-email-send.learner.exception";
import { GenericErrorException } from "../exceptions/generic-error.learner.exception";
import { ApiLogger } from "src/utils/logger/api-logger.service";

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

  private logger = new ApiLogger(InviteLearnerService.name);

  async invite(inviteLearnerDto: InviteLearnerDto, spaceId: number) {
    const { email, name, assignedByUser } = inviteLearnerDto;

    this.logger.log(`Inviting learner with email: ${email} to spaceId: ${spaceId}`);

    const existingLearner = await this.findLearner(spaceId, email);

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

      await this.handleExistingLearner(learner, existingLearner);
    } catch {
      throw new SaveLearnerException();
    }

    this.sendEmail(email, hash);
  }

  private async findLearner(spaceId: number, email: string) {
    this.logger.log(`Finding existing learner with email: ${email} in spaceId: ${spaceId}`);

    const existing = await this.learnerRepo.findOne({
      where: {
        spaceId,
        email,
      },
    });

    if (existing && existing.status !== 'invited') throw new ConflictLearnerException();
    return existing;
  }

  private async sendEmail(email: string, token: string) {
    this.logger.log(`Sending invitation email to learner with email: ${email}`);

    const magicLink = `${process.env.PUBLIC_URL}/accept-invite/${token}`;

    try {
      await this.emailsQueue.add('send', {
        to: email,
        from: process.env.SMTP_GLOBAL_FROM,
        subject: 'Invitation to register as a Learner in a Shira space',
        template: 'learner-invitation',
        data: { email, magicLink }
      })
    } catch {
      throw new InvitationEmailSendFailedException();
    }
  }

  async accept(token: string): Promise<string> {
    const learner = await this.learnerRepo.findOne({
      where: {
        invitationToken: token,
        status: Not('registered')
      }
    });

    if (!learner) throw new GenericErrorException();

    this.logger.log(`Accepting invitation for learner with email: ${learner.email}`);

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
    } catch {
      throw new SaveLearnerException();
    }
  }

  private async handleExistingLearner(
    learner: LearnerEntity,
    existingLearner?: LearnerEntity
  ) {
    this.logger.log(`Handling existing learner with email: ${learner.email}`);

    if (existingLearner && existingLearner.status === 'invited') {
      await this.learnerRepo.update(
        { id: existingLearner.id },
        { invitedAt: new Date() }
      );
    } else {
      await this.learnerRepo.save(learner);
    }

  }
}
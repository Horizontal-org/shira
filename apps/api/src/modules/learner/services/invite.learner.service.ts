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
import { OrganizationEntity } from "src/modules/organization/domain/organization.entity";

@Injectable()
export class InviteLearnerService implements IInviteLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private readonly learnerRepo: Repository<LearnerEntity>,
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>,
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepo: Repository<OrganizationEntity>,
    @InjectQueue('emails')
    private emailsQueue: Queue
  ) { }

  private logger = new ApiLogger(InviteLearnerService.name);

  async invite(inviteLearnerDto: InviteLearnerDto, spaceId: number) {
    const { email, name, assignedByUser } = inviteLearnerDto;

    this.logger.log(`Inviting learner with email: ${email} to spaceId: ${spaceId}`);

    const existingLearner = await this.findLearner(spaceId, email);

    const organization = await this.organizationRepo
      .createQueryBuilder('organization')
      .innerJoin('organization.spaces', 'space')
      .where('space.id = :spaceId', { spaceId })
      .select(['organization.name'])
      .getOne();

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
    } catch (error) {
      this.logger.error(`Error saving learner with email: ${email} - ${error.message}`);
      throw new SaveLearnerException(email);
    }

    await this.sendEmail(email, hash, organization.name);
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

  private async sendEmail(email: string, token: string, organization: string) {
    this.logger.log(`Sending invitation email to learner with email: ${email}`);

    const magicLink = `${process.env.PUBLIC_URL}/accept-invite/${token}`;

    try {
      await this.emailsQueue.add('send', {
        to: email,
        from: process.env.SMTP_GLOBAL_FROM,
        subject: `${organization} invited to join their Shira space`,
        template: 'learner-invitation',
        data: { email, magicLink, organization }
      })
      this.logger.log(`Invitation email queued successfully for email: ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send invitation email to ${email}: ${error.message}`);
      throw new InvitationEmailSendFailedException(email);
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
    } catch (error) {
      this.logger.error(`Error updating learner ${learner.email}: - ${error.message}`);
      throw new SaveLearnerException();
    }
  }

  private async handleExistingLearner(
    learner: LearnerEntity,
    existingLearner?: LearnerEntity
  ) {
    if (existingLearner && existingLearner.status === 'invited') {
      await this.learnerRepo.update(
        { id: existingLearner.id },
        {
          invitedAt: new Date(),
          invitationToken: learner.invitationToken
        }
      );
      this.logger.log(`Updated invitation date for existing learner with ID: ${existingLearner.id}`);
    } else {
      await this.learnerRepo.save(learner);
      this.logger.log(`Saved new learner with email: ${learner.email}`);
    }
  }
}

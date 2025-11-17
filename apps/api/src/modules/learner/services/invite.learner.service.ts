import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InviteLearnerDto } from "../dto/invitation.learner.dto";
import { IInviteLearnerService } from "../interfaces/services/invite.learner.service.interface";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import * as crypto from 'crypto';
import { SpaceEntity } from "src/modules/space/domain/space.entity";
import { EmailSendFailedException, TokenConflictLearnerException, SavingLearnerException, ConflictLearnerException } from "../exceptions";
import { LearnerRepositoryService } from "./learner-repository.service";

@Injectable()
export class InviteLearnerService implements IInviteLearnerService {
  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>,
    @InjectQueue('emails')
    private emailsQueue: Queue,
    private readonly learnerRepoService: LearnerRepositoryService,
  ) { }

  async invite(inviteLearnerDto: InviteLearnerDto) {
    const { email, spaceId, name, assignedByUser } = inviteLearnerDto;

    console.debug("InviteLearnerService ~ create ~ email:", email, "spaceId:", spaceId);

    await this.learnerRepoService.findOne({ where: { spaceId, email } });

    const hash = crypto.randomBytes(20).toString('hex');

    const learner = await this.learnerRepoService.create({
      email,
      name,
      spaceId,
      invitationToken: hash,
      status: 'invited',
      assignedByUser: assignedByUser,
      invitedAt: new Date(),
    });

    await this.learnerRepoService.save(learner);
    return { hash: hash, email, spaceId };
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
      console.error('InviteLearnerService ~ error sending invitation email', { err });
      throw new EmailSendFailedException();
    }
  }

  async accept(token: string): Promise<string> {
    const learner = await this.learnerRepoService.findOne({
      where: { invitationToken: token }
    });

    if (!learner) throw new TokenConflictLearnerException();

    console.debug("InviteLearnerService ~ accept ~ learner:", learner.id, "spaceId:", learner.spaceId);

    const space = await this.spaceRepo.findOne({
      where: { id: learner.spaceId },
      select: { name: true }
    });

    try {
      await this.learnerRepoService.update(
        { invitationToken: token },
        { ...learner, status: 'registered', registeredAt: new Date() }
      );
      return space.name;
    } catch (err) {
      console.error('InviteLearnerService ~ error accepting invitation', { err });
      throw new SavingLearnerException();
    }
  }
}
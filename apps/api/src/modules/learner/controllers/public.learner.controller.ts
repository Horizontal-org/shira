import { Controller, Inject, Param, Post } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { IInviteLearnerService } from '../interfaces/services/invite.learner.service.interface';

@Controller('learners')
export class PublicLearnerController {
  constructor(
    @Inject(TYPES.services.IInviteLearnerService)
    private readonly inviteService: IInviteLearnerService
  ) { }

  @Post('invitations/:token/accept')
  async accept(@Param('token') token: string) {
    const spaceName = await this.inviteService.accept(token);
    return { message: 'Invitation accepted', spaceName };
  }
}
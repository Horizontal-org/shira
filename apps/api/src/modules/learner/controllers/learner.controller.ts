import { Body, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { TYPES } from '../interfaces';
import { InviteLearnerDto } from '../dto/invitation.learner.dto';
import { AssignLearnerDto } from '../dto/assign.learner.dto';
import { IInviteLearnerService } from '../interfaces/services/invite.learner.service.interface';
import { IAssignLearnerService } from '../interfaces/services/assign.learner.service.interface';

@AuthController('learners')
export class LearnerController {
  constructor(
    @Inject(TYPES.services.IInviteLearnerService)
    private readonly inviteLearnerService: IInviteLearnerService,
    @Inject(TYPES.services.IAssignLearnerService)
    private readonly assignLearnerService: IAssignLearnerService
  ) { }

  @Post('invitations')
  async invite(@Body() inviteLearnerDto: InviteLearnerDto) {
    await this.inviteLearnerService.invite(inviteLearnerDto);
    await this.inviteLearnerService.sendEmail(inviteLearnerDto);
    return { message: 'Learner invited' }; // 201
  }

  @Post('invitations/:token/accept')
  async accept(@Param('token') token: string) {
    await this.inviteLearnerService.accept(token);
    return { message: 'Invitation accepted' }; // 204
  }

  @Post('invitations/bulk')
  async inviteBulk() {
    //TODO invite bulk
  }

  @Post('assignments')
  async assign(@Body() assignLearnerDto: AssignLearnerDto) {
    await this.assignLearnerService.assign(assignLearnerDto);
    return { message: 'Learner assigned' };
  }

  @Post('assignments/bulk')
  async assignBulk() {
    //TODO assign bulk
  }
}
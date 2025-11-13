import { Body, Controller, HttpCode, Inject, Param, Post } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { InviteLearnerDto } from '../dto/invitation.learner.dto';
import { AssignLearnerDto } from '../dto/assign.learner.dto';
import { IInviteLearnerService } from '../interfaces/services/invite.learner.service.interface';
import { IAssignLearnerService } from '../interfaces/services/assign.learner.service.interface';

@Controller('learners')
export class LearnerController {
  constructor(
    @Inject(TYPES.services.IInviteLearnerService)
    private readonly inviteLearnerService: IInviteLearnerService,
    @Inject(TYPES.services.IAssignLearnerService)
    private readonly assignLearnerService: IAssignLearnerService
  ) { }

  @Post('invitations')
  async invite(@Body() inviteLearnerDto: InviteLearnerDto) {
    const response = await this.inviteLearnerService.invite(inviteLearnerDto);
    await this.inviteLearnerService.sendEmail(response.email, response.spaceId, response.rawToken);
    return { message: 'Learner invited' };
  }

  @Post('invitations/:token/accept')
  async accept(@Param('token') token: string) {
    await this.inviteLearnerService.accept(token);
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
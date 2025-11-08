import { Body, Get, Inject, Post } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { TYPES } from '../interfaces';
import { InviteLearnerDto } from '../dto/invitation.learner.dto';
import { AssignLearnerDto } from '../dto/assign.learner.dto';
import { IInviteLearnerService } from '../interfaces/services/invite.learner.service.interface';
import { IAssignLearnerService } from '../interfaces/services/assign.learner.service.interface';

@AuthController('learner')
export class LearnerController {
  constructor(
    @Inject(TYPES.services.IInviteLearnerService)
    private readonly inviteLearnerService: IInviteLearnerService,
    @Inject(TYPES.services.IAssignLearnerService)
    private readonly assignLearnerService: IAssignLearnerService
  ) { }

  @Post('invite')
  async invite(@Body() inviteLearnerDto: InviteLearnerDto) {
    await this.inviteLearnerService.invite(inviteLearnerDto);
    await this.inviteLearnerService.sendInvitationEmail(inviteLearnerDto);
    return { message: 'Learner invited' };
  }

  @Post('invite/bulk')
  async inviteBulk() {
    //TODO invite bulk
  }

  @Post('assign')
  async assign(@Body() assignLearnerDto: AssignLearnerDto) {
    await this.assignLearnerService.assign(assignLearnerDto);
    return { message: 'Learner assigned' };
  }

  @Post('assign/bulk')
  async assignBulk() {
    //TODO assign bulk
  }

  @Get(':id')
  async getLearner() {
    //TODO get learner by id
  }

  @Get('space/:spaceId')
  async getLearnersBySpace() {
    //TODO get learners by space
  }
}
import { Body, Inject, Post, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { TYPES } from '../interfaces';
import { InviteLearnerDto } from '../dto/invitation.learner.dto';
import { IInviteLearnerService } from '../interfaces/services/invite.learner.service.interface';
import { IAssignLearnerService } from '../interfaces/services/assign.learner.service.interface';
import { AssignLearnerDto } from '../dto/assign.learner.dto';

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
    try {
      await this.inviteLearnerService.execute(inviteLearnerDto);
    } catch (e) {
      console.log("🚀 ~ InviteLearnerController ~ invite ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }

  @Post('invite/bulk')
  async inviteBulk() {
    //TODO invite bulk
  }

  @Post('assign')
  async assign(@Body() assignLearnerDto: AssignLearnerDto) {
    try {
      await this.assignLearnerService.execute(assignLearnerDto);
    } catch (e) {
      console.log("🚀 ~ AssignLearnerController ~ assign ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }

  @Post('assign/bulk')
  async assignBulk() {
    //TODO assign bulk
  }
}
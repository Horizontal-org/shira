import { Body, Inject, Post, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { TYPES } from '../interfaces';
import { InviteLearnerDto } from '../dto/invitation.learner.dto';
import { IInviteLearnerService } from '../interfaces/services/invite.learner.service.interface';

@AuthController('learner')
export class InviteLearnerController {
  constructor(
    @Inject(TYPES.services.IInviteLearnerService)
    private readonly inviteLearnerService: IInviteLearnerService,
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
}
import { Body, Inject, Post } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { InviteLearnerDto } from '../dto/invitation.learner.dto';
import { AssignLearnerDto } from '../dto/assign.learner.dto';
import { IInviteLearnerService } from '../interfaces/services/invite.learner.service.interface';
import { IAssignLearnerService } from '../interfaces/services/assign.learner.service.interface';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';

@AuthController('learners')
export class AuthLearnerController {
  constructor(
    @Inject(TYPES.services.IInviteLearnerService)
    private readonly inviteLearnerService: IInviteLearnerService,
    @Inject(TYPES.services.IAssignLearnerService)
    private readonly assignLearnerService: IAssignLearnerService
  ) { }

  @Post('invitations')
  @Roles(Role.SpaceAdmin)
  async invite(@Body() inviteLearnerDto: InviteLearnerDto) {
    const response = await this.inviteLearnerService.invite(inviteLearnerDto);
    await this.inviteLearnerService.sendEmail(response.email, response.spaceId, response.rawToken);
    return { message: 'Learner invited' };
  }

  @Post('invitations/bulk')
  async inviteBulk() {
    //TODO invite bulk
  }

  @Post('assignments')
  @Roles(Role.SpaceAdmin)
  async assign(@Body() assignLearnerDto: AssignLearnerDto) {
    await this.assignLearnerService.assign(assignLearnerDto);
    return { message: 'Learner assigned' };
  }

  @Post('assignments/bulk')
  async assignBulk() {
    //TODO assign bulk
  }
}
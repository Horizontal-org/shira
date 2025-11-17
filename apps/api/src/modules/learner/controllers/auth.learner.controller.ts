import { Body, Inject, Post } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { InviteLearnerDto } from '../dto/invitation.learner.dto';
import { AssignLearnerDto } from '../dto/assign.learner.dto';
import { IInviteLearnerService } from '../interfaces/services/invite.learner.service.interface';
import { IAssignLearnerService } from '../interfaces/services/assign.learner.service.interface';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { SpaceId } from 'src/modules/auth/decorators';

@AuthController('learners')
export class AuthLearnerController {
  constructor(
    @Inject(TYPES.services.IInviteLearnerService)
    private readonly inviteService: IInviteLearnerService,
    @Inject(TYPES.services.IAssignLearnerService)
    private readonly assignService: IAssignLearnerService
  ) { }

  @Post('invitations')
  @Roles(Role.SpaceAdmin)
  async invite(
    @Body() inviteLearnerDto: InviteLearnerDto,
    @SpaceId() spaceId: number) {
    const response = await this.inviteService.invite(inviteLearnerDto, spaceId);
    await this.inviteService.sendEmail(response.email, spaceId, response.hash);
    return { message: 'learner_invited', email: response.email };
  }

  @Post('invitations/bulk')
  async inviteBulk() {
    //TODO invite bulk
  }

  @Post('assignments')
  @Roles(Role.SpaceAdmin)
  async assign(
    @Body() assignLearnerDto: AssignLearnerDto,
    @SpaceId() spaceId: number) {
    await this.assignService.assign(assignLearnerDto, spaceId);
    await this.assignService.sendEmail(assignLearnerDto.email, spaceId);
    return { message: 'learner_assigned', email: assignLearnerDto.email };
  }

  @Post('assignments/bulk')
  async assignBulk() {
    //TODO assign bulk
  }
}
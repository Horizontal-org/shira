import { Body, Delete, Inject, Post } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { InviteLearnerDto } from '../dto/invitation.learner.dto';
import { AssignLearnerDto } from '../dto/assign.learner.dto';
import { IInviteLearnerService } from '../interfaces/services/invite.learner.service.interface';
import { IAssignLearnerService } from '../interfaces/services/assign.learner.service.interface';
import { IUnassignLearnerService } from '../interfaces/services/unassign.learner.service.interface';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { SpaceId } from 'src/modules/auth/decorators';
import { IDeleteLearnerService } from '../interfaces/services/delete.learner.service.interface';
import { DeleteLearnerDto } from '../dto/delete.learner.dto';
import { UnassignLearnerDto } from '../dto/unassign.learner.dto';
import { InvitationBulkLearnerDto } from '../dto/invitation-bulk.learner.dto';
import { IInviteBulkLearnerService } from '../interfaces/services/invite-bulk.learner.service.interface';

@AuthController('learners')
export class AuthLearnerController {
  constructor(
    @Inject(TYPES.services.IInviteLearnerService)
    private readonly inviteService: IInviteLearnerService,
    @Inject(TYPES.services.IInviteBulkLearnerService)
    private readonly inviteBulkService: IInviteBulkLearnerService,
    @Inject(TYPES.services.IAssignLearnerService)
    private readonly assignService: IAssignLearnerService,
    @Inject(TYPES.services.IUnassignLearnerService)
    private readonly unassignService: IUnassignLearnerService,
    @Inject(TYPES.services.IDeleteLearnerService)
    private readonly deleteLearnerService: IDeleteLearnerService,
  ) { }

  @Post('invitations')
  @Roles(Role.SpaceAdmin)
  async invite(
    @Body() inviteLearnerDto: InviteLearnerDto,
    @SpaceId() spaceId: number
  ) {
    await this.inviteService.invite(inviteLearnerDto, spaceId);
  }

  @Post('invitations/bulk')
  async inviteBulk(
    @Body() inviteBulkLearnerDto: InvitationBulkLearnerDto,
    @SpaceId() spaceId: number
  ) {
    // WIP
    // await this.inviteBulkService.invite(inviteBulkLearnerDto, spaceId);
  }

  @Delete('delete')
  @Roles(Role.SpaceAdmin)
  async delete(
    @Body() deleteLearnerDto: DeleteLearnerDto,
    @SpaceId() spaceId: number
  ) {
    await this.deleteLearnerService.delete(deleteLearnerDto, spaceId);
  }

  @Post('assignments')
  @Roles(Role.SpaceAdmin)
  async assign(
    @Body() assignLearnerDto: AssignLearnerDto,
    @SpaceId() spaceId: number
  ) {
    return await this.assignService.assign(assignLearnerDto, spaceId);
  }

  @Delete('assignments')
  @Roles(Role.SpaceAdmin)
  async unassign(
    @Body() unassignLearnerDto: UnassignLearnerDto,
    @SpaceId() spaceId: number
  ) {
    return await this.unassignService.unassign(unassignLearnerDto, spaceId);
  }
}

import { Body, Post } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { Role } from "src/modules/user/domain/role.enum";
import { Roles } from "src/modules/auth/decorators/roles.decorators";
import { TYPES } from "../interfaces";
import { IAssociateUserSpaceService } from '../interfaces/services/associate-user.space.controller'
import { AssociateUserDto } from "../domain/associate-user.space.dto";

@AuthController('space')
export class AssociateUserSpaceController {
  constructor(
    @Inject(TYPES.services.IAssociateUserSpaceService)
    private readonly associateUserService: IAssociateUserSpaceService
  ) {}

  @Post('associate-user')
  @Roles(Role.SuperAdmin)
  async handler(@Body() dto: AssociateUserDto) {
    try {
      await this.associateUserService.execute(dto)
      return { success: true };
    } catch(e) {
      console.log(e)
      throw e
    }
  }
}
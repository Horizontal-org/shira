import { Delete, Param, ParseIntPipe, Inject } from "@nestjs/common";
import { Roles } from "src/modules/auth/decorators/roles.decorators";
import { Role } from "src/modules/user/domain/role.enum";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { TYPES } from "../interfaces";
import { IDeleteSpaceService } from "../interfaces/services/delete.space.service.interface";

@AuthController('space')
export class DeleteSpaceController {
  constructor(
    @Inject(TYPES.services.IDeleteSpaceService)
    private readonly deleteSpaceService: IDeleteSpaceService
  ){}
  @Delete(':id')
  @Roles(Role.SuperAdmin)
  async delete(
    @Param('id', ParseIntPipe) id: number
  )
  {
    await this.deleteSpaceService.execute(id)
  }

}
import { Param, ParseIntPipe, Inject, Delete } from "@nestjs/common"
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { Roles } from "src/modules/auth/decorators/roles.decorators";
import { Role } from "src/modules/user/domain/role.enum";
import { TYPES } from "../interfaces";
import { IDeleteOrganizationService } from "../interfaces/services/delete.organization.service.interface";

@AuthController('organization')
export class DeleteOrganizationController {
    constructor(
        @Inject(TYPES.services.IDeleteOrganizationService)
        private readonly deleteOrgService: IDeleteOrganizationService,
    ) { }


    @Delete('/:id')
    @Roles(Role.SuperAdmin)
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.deleteOrgService.execute(id);
    }
}
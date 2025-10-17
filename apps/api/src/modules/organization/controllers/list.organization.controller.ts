import { Get, Param, ParseIntPipe, Inject } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { OrganizationEntity } from "../domain/organization.entity";
import { Repository } from "typeorm";
import { Roles } from "src/modules/auth/decorators/roles.decorators";
import { Role } from "src/modules/user/domain/role.enum";
import { TYPES } from "../interfaces";
import { IGetOrganizationService } from "../interfaces/services/get.organization.service.interface";

@AuthController('organization')
export class ListOrganizationController {
    constructor(
        @InjectRepository(OrganizationEntity)
        private readonly organizationRepository: Repository<OrganizationEntity>,
        @Inject(TYPES.services.IGetOrganizationService)
        private readonly organizationService: IGetOrganizationService,
    ) { }

    @Get('')
    @Roles(Role.SuperAdmin)
    async handler() {
        return this.organizationRepository.find()
    }

    @Get('/:id')
    @Roles(Role.SuperAdmin)
    async handlerFindById(@Param('id', ParseIntPipe) id: number) {
        return this.organizationService.execute(id);
    }
}
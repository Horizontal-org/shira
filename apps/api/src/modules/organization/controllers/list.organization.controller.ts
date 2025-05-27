import { Get, Param, ParseIntPipe } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { OrganizationEntity } from "../domain/organization.entity";
import { Repository } from "typeorm";
import { Roles } from "src/modules/auth/decorators/roles.decorators";
import { Role } from "src/modules/user/domain/role.enum";

@AuthController('organization')
export class ListOrganizationController {
    constructor(
        @InjectRepository(OrganizationEntity)
        private readonly organizationRepository: Repository<OrganizationEntity>
    ){}

    @Get('')
    @Roles(Role.SuperAdmin)
    async handler() {
        return this.organizationRepository.find()
    }

    @Get('/:id')
    @Roles(Role.SuperAdmin)
    async handlerFindById(@Param('id', ParseIntPipe) id: number) {
        return await this.organizationRepository.findOne({
            where: { id },
            relations: [
                'spaces',
                'organizationUsers',
                'organizationUsers.user',
                'organizationUsers.role',
                'organizationSubscriptions',
                'organizationSubscriptions.subscription'
            ]
        })
    }
}
import { Injectable } from "@nestjs/common";
import { ICreateOrganizationService } from "../interfaces/services/create.organization.service.interface";
import { OrganizationEntity } from "../domain/organization.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "src/modules/user/domain/user.entity";
import { OrganizationUsersEntity } from "../domain/organization_users.entity";
import { RoleEntity } from "src/modules/user/domain/role.entity";
import { Role } from "src/modules/user/domain/role.enum";

@Injectable()
export class CreateOrganizationService implements ICreateOrganizationService {
    constructor(
        @InjectRepository(OrganizationEntity)
        private readonly organizationRepo: Repository<OrganizationEntity>,
        @InjectRepository(OrganizationUsersEntity)
        private readonly organizationUserRepo: Repository<OrganizationUsersEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleRepo: Repository<RoleEntity>
    ){}

    async execute(name: string, firstUser: UserEntity): Promise<OrganizationEntity> {
        const organization = new OrganizationEntity()
        organization.name = name
        const savedOrganization =  await this.organizationRepo.save(organization)

        const orgAdminRole = await this.roleRepo.findOne({
        where: { name: Role.OrganizationAdmin} //if it's invited through this endpoint it's going to be OA always
        });

        if (!orgAdminRole) {
        throw new Error('Organization admin role not found');
        }

        const organizationUser = new OrganizationUsersEntity();
        organizationUser.userId = firstUser.id;
        organizationUser.organizationId = savedOrganization.id;
        organizationUser.roleId = orgAdminRole.id;
        organizationUser.createdAt = new Date();
        organizationUser.updatedAt = new Date();

        await this.organizationUserRepo.save(organizationUser);

        return savedOrganization
    }
}
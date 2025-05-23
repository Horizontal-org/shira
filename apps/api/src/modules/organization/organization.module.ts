import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganizationEntity } from "./domain/organization.entity";
import { OrganizationUsersEntity } from "./domain/organization_users.entity";
import { RoleEntity } from "../user/domain/role.entity";
import { servicesOrganizationProviders, createOrganizationServiceProvider } from "./organization.providers";
@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrganizationEntity,
            OrganizationUsersEntity,
            RoleEntity
        ]),
    ],
    providers: [
        ...servicesOrganizationProviders
    ],
    exports: [
        createOrganizationServiceProvider
    ],
})

export class OrganizationModule {}
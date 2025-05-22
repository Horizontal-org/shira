import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganizationEntity } from "./domain/organization.entity";
import { OrganizationUsersEntity } from "./domain/organization_users.entity";
import { RoleEntity } from "../user/domain/role.entity";
@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrganizationEntity,
            OrganizationUsersEntity,
            RoleEntity
        ]),
    ],
    exports: [TypeOrmModule],
})

export class OrganizationModule {}
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganizationEntity } from "./domain/organization.entity";
import { OrganizationUsersEntity } from "./domain/organization_users.entity";
import { RoleEntity } from "../user/domain/role.entity";
import { servicesOrganizationProviders, createOrganizationServiceProvider, getOrganizationServiceProvider } from "./organization.providers";
import { OrganizationControllers } from "./controllers";
import { Quiz } from "../quiz/domain/quiz.entity";
import { SpaceEntity } from "../space/domain/space.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrganizationEntity,
            OrganizationUsersEntity,
            RoleEntity,
            SpaceEntity,
            Quiz
        ]),
    ],
    providers: [
        ...servicesOrganizationProviders
    ],
    controllers: [...OrganizationControllers],
    exports: [
        createOrganizationServiceProvider,
        getOrganizationServiceProvider
    ],
})

export class OrganizationModule { }

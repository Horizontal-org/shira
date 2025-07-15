import { UserEntity } from "src/modules/user/domain/user.entity";
import { OrganizationEntity } from "../../domain/organization.entity";

export interface ICreateOrganizationService {
    execute(name: string, firstUser: UserEntity): Promise<OrganizationEntity>;
}
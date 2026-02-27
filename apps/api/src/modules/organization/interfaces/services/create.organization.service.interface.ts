import { UserEntity } from "src/modules/user/domain/user.entity";
import { OrganizationEntity } from "../../domain/organization.entity";

export interface ICreateOrganizationService {
    execute(
        name: string, 
        orgType: "business" | "cibersecurity" | "non-profit" | "individual", 
        firstUser: UserEntity
    ): Promise<OrganizationEntity>;
}
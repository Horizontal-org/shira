import { OrganizationEntity } from "../../domain/organization.entity";

export interface IGetOrganizationService {
    execute(id: number): Promise<OrganizationEntity>;
}
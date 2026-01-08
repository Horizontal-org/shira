import { OrganizationEntity } from "../../domain/organization.entity";

export interface IListOrganizationService {
    execute(): Promise<OrganizationEntity[]>;
}
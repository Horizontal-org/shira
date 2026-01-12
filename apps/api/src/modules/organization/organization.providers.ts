import { TYPES } from "./interfaces";
import { CreateOrganizationService } from "./services/create.organization.service";
import { DeleteOrganizationService } from "./services/delete.organization.service";
import { OrganizationService } from "./services/get.organization.service";
import { ListOrganizationService } from "./services/list.organization.service";


export const createOrganizationServiceProvider = {
    provide: TYPES.services.ICreateOrganizationService,
    useClass: CreateOrganizationService
};

export const getOrganizationServiceProvider = {
    provide: TYPES.services.IGetOrganizationService,
    useClass: OrganizationService
}

export const listOrganizationServiceProvider = {
    provide: TYPES.services.IListOrganizationService,
    useClass: ListOrganizationService
}

export const deleteOrganizationServiceProvider = { 
    provide: TYPES.services.IDeleteOrganizationService,
    useClass: DeleteOrganizationService
}

export const servicesOrganizationProviders = [
    createOrganizationServiceProvider,
    getOrganizationServiceProvider,
    listOrganizationServiceProvider,
    deleteOrganizationServiceProvider
]
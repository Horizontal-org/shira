import { TYPES } from "./interfaces";
import { CreateOrganizationService } from "./services/create.organization.service";
import { OrganizationService } from "./services/get.organization.service";


export const createOrganizationServiceProvider = {
    provide: TYPES.services.ICreateOrganizationService,
    useClass: CreateOrganizationService
};

export const getOrganizationServiceProvider = {
    provide: TYPES.services.IGetOrganizationService,
    useClass: OrganizationService
}

export const servicesOrganizationProviders = [
    createOrganizationServiceProvider,
    getOrganizationServiceProvider
]
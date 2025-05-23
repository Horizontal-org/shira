import { TYPES } from "./interfaces";
import { CreateOrganizationService } from "./services/create.organization.service";

export const createOrganizationServiceProvider = {
    provide: TYPES.services.ICreateOrganizationService,
    useClass: CreateOrganizationService
}

export const servicesOrganizationProviders = [
    createOrganizationServiceProvider
]
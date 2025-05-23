import { Inject } from "@nestjs/common";
import { RegisterAuthDto } from "../domain/register.auth.dto";
import { ISpaceRegistrationAuthService, IValidateRegistrationAuthService, TYPES } from "../interfaces";
import { TYPES as TYPES_PASSPHRASE } from '../../passphrase/interfaces'
import { ICreateUserApplication, TYPES as TYPES_USER } from '../../user/interfaces'
import { TYPES as TYPES_SPACE } from '../../space/interfaces'
import { TYPES as TYPES_ORGANIZATION } from '../../organization/interfaces'
import { ICreateOrganizationService } from "src/modules/organization/interfaces/services/create.organization.service.interface";
import { IUsePassphraseService } from "src/modules/passphrase/interfaces/services/use.passphrase.service.interface";
import { ICreateSpaceService } from "src/modules/space/interfaces/services/create.space.service.interface";
import { hashPassword } from "src/utils/password.utils";
import { Role } from "src/modules/user/domain/role.enum";

export class SpaceRegistrationAuthService implements ISpaceRegistrationAuthService {
  constructor(
    @Inject(TYPES_PASSPHRASE.services.IUsePassphraseService)
    private readonly usePassphrasesService: IUsePassphraseService,
    @Inject(TYPES_USER.applications.ICreateUserApplication)
    private readonly createUserApplication: ICreateUserApplication,
    @Inject(TYPES_SPACE.services.ICreateSpaceService)
    private readonly createSpaceService: ICreateSpaceService,
    @Inject(TYPES.services.IValidateRegistrationAuthService)
    private readonly validateRegistrationService: IValidateRegistrationAuthService,
    @Inject(TYPES_ORGANIZATION.services.ICreateOrganizationService)
    private readonly createOrganizationService: ICreateOrganizationService,
  ){}
  async execute(registrationData: RegisterAuthDto): Promise<void> {
    // check if passphrase is valid
    await this.validateRegistrationService.execute(registrationData)

    // invalidate the passphrase once checked
    const passphrase = await this.usePassphrasesService.execute(
      registrationData.passphrase,
      registrationData.email
    )

    const hashedPassword = await hashPassword(registrationData.password)
    const user = await this.createUserApplication.execute({
      email: registrationData.email,
      password: hashedPassword,
      role: Role.SpaceAdmin
    })

    // create org
    const organization = await this.createOrganizationService.execute(
      passphrase.slug,
      user
    )

    await this.createSpaceService.execute({
      name: registrationData.spaceName,
      firstUser: user,
      slug: passphrase.slug,
      organizationId: organization.id
    })
    
    return
  }
}
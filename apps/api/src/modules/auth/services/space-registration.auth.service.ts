import { Inject } from "@nestjs/common";
import { RegisterAuthDto } from "../domain/register.auth.dto";
import { ISpaceRegistrationAuthService, IValidateRegistrationAuthService, TYPES } from "../interfaces";
import { TYPES as TYPES_PASSPHRASE } from '../../passphrase/interfaces'
import { ICreateUserApplication, TYPES as TYPES_USER } from '../../user/interfaces'
import { TYPES as TYPES_SPACE } from '../../space/interfaces'
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
    private readonly validateRegistrationService: IValidateRegistrationAuthService
  ){}
  async execute(registrationData: RegisterAuthDto): Promise<void> {
    await this.validateRegistrationService.execute(registrationData)

    await this.usePassphrasesService.execute(
      registrationData.passphrase,
      registrationData.email
    )

    const hashedPassword = await hashPassword(registrationData.password)
    const user = await this.createUserApplication.execute({
      email: registrationData.email,
      password: hashedPassword,
      role: Role.SpaceAdmin
    })

    await this.createSpaceService.execute({
      name: registrationData.spaceName,
      firstUser: user
    })
    
    return
  }
}
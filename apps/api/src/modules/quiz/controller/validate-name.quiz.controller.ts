import { Body, Get, Inject } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { LoggedUser } from 'src/modules/auth/decorators';
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto';
import { ValidateQuizNameQuizDto } from '../dto/validate-name.quiz.dto';
import { IValidateQuizNameService } from '../interfaces/services/validate-name.quiz.service.interface';

@AuthController('quiz')
export class ValidateQuizNameController {
  constructor(
    @Inject(TYPES.services.IValidateQuizNameService)
    private readonly validateQuizNameService: IValidateQuizNameService,
  ) { }

  @Get('validate-name')
  @Roles(Role.SpaceAdmin)
  async execute(
    @LoggedUser() user: LoggedUserDto,
    @Body() dto: ValidateQuizNameQuizDto
  ) {
    dto.space = user.activeSpace.space;
    await this.validateQuizNameService.execute(dto.title, dto.space.id);
  }
}

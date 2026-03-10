import { Body, Inject, Post } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { SpaceId } from 'src/modules/auth/decorators';
import { ValidateQuizNameQuizDto } from '../dto/validate-name.quiz.dto';
import { IValidateQuizNameService } from '../interfaces/services/validate-name.quiz.service.interface';

@AuthController('quiz')
export class ValidateQuizNameController {
  constructor(
    @Inject(TYPES.services.IValidateQuizNameService)
    private readonly validateQuizNameService: IValidateQuizNameService,
  ) { }

  @Post('validate-name')
  @Roles(Role.SpaceAdmin)
  async execute(
    @Body() dto: ValidateQuizNameQuizDto,
    @SpaceId() spaceId: number
  ) {
    await this.validateQuizNameService.execute(dto.title, spaceId);
  }
}

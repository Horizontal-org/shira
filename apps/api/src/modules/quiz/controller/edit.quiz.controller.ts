import { Body, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

import {
  TYPES,
} from '../interfaces';

import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { LoggedUser } from 'src/modules/auth/decorators';
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto';
import { EditQuizDto } from '../dto/edit.quiz.dto';
import { IEditQuizService } from '../interfaces/services/edit.quiz.service.interface';

@AuthController('quiz')
export class EditQuizController {
  constructor(
    @Inject(TYPES.services.IEditQuizService)
    private editQuizService: IEditQuizService,    
  ) {}

  @Put(':id')
  @Roles(Role.SpaceAdmin)
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @LoggedUser() user: LoggedUserDto,
    @Body() editDto: EditQuizDto
  ) 
  {    
    editDto.id = id
    editDto.spaceId = user.space.id
    await this.editQuizService.execute(editDto)
  }
}

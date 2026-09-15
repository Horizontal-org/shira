import { Body, Inject, Post, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { TYPES } from '../interfaces';
import { SpaceId } from 'src/modules/auth/decorators';
import { TYPES as TYPES_QUIZ } from 'src/modules/quiz/interfaces';
import { IValidateSpaceQuizService } from 'src/modules/quiz/interfaces/services/validate-space.quiz.service.interface';
import { IDeleteNoteService } from '../interfaces/services/delete.note.service.interface';
import { DeleteNoteDto } from '../dto/delete.note.dto';

@AuthController('note')
export class DeleteNoteController {
  constructor(
    @Inject(TYPES.services.IDeleteNoteService)
    private deleteNoteService: IDeleteNoteService,
    @Inject(TYPES_QUIZ.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService
  ) { }

  @Post('delete')
  @Roles(Role.SpaceAdmin)
  async handler(
    @Body() deleteDto: DeleteNoteDto,
    @SpaceId() spaceId: number
  ) {
    await this.validateSpaceQuizService.execute(spaceId, deleteDto.quizId)

    try {
      await this.deleteNoteService.execute(deleteDto);
    } catch (e) {
      console.log("🚀 ~ DeleteNoteController ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }
}

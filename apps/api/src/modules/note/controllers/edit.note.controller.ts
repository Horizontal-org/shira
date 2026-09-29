import { Body, Inject, Put, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { TYPES } from '../interfaces';
import { EditNoteDto } from '../dto/edit.note.dto';
import { IEditNoteService } from '../interfaces/services/edit.note.service.interface';
import { TYPES as TYPES_QUIZ } from 'src/modules/quiz/interfaces';
import { IValidateSpaceQuizService } from 'src/modules/quiz/interfaces/services/validate-space.quiz.service.interface';
import { SpaceId } from 'src/modules/auth/decorators';

@AuthController('note')
export class EditNoteController {
  constructor(
    @Inject(TYPES.services.IEditNoteService)
    private editNoteService: IEditNoteService,
    @Inject(TYPES_QUIZ.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService
  ) {}

  @Put()
  @Roles(Role.SpaceAdmin)
  async handler(
    @Body() editNote: EditNoteDto,
    @SpaceId() spaceId: number
  ) {
    await this.validateSpaceQuizService.execute(spaceId, editNote.quizId)

    try {
      await this.editNoteService.execute(editNote);
    } catch (e) {
      console.log("🚀 ~ EditNoteController ~ handler ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }
}

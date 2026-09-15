import { Body, Inject, Put, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { TYPES } from '../interfaces';
import { EditNoteQuizDto } from '../dto/edit-note.quiz.dto';
import { IEditNoteQuizService } from '../interfaces/services/edit-note.quiz.service.interface';
import { IValidateSpaceQuizService } from '../interfaces/services/validate-space.quiz.service.interface';
import { SpaceId } from 'src/modules/auth/decorators';

@AuthController('quiz')
export class EditNoteQuizController {
  constructor(
    @Inject(TYPES.services.IEditNoteQuizService)
    private editNoteService: IEditNoteQuizService,
    @Inject(TYPES.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService
  ) {}

  @Put('note')
  @Roles(Role.SpaceAdmin)
  async handler(
    @Body() editNote: EditNoteQuizDto,
    @SpaceId() spaceId: number
  ) {
    await this.validateSpaceQuizService.execute(spaceId, editNote.quizId)

    try {
      await this.editNoteService.execute(editNote);
    } catch (e) {
      console.log("🚀 ~ EditNoteQuizController ~ handler ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }
}

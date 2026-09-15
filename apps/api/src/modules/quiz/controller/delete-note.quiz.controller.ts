import { Body, Inject, Post, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { TYPES } from '../interfaces';
import { SpaceId } from 'src/modules/auth/decorators';
import { IValidateSpaceQuizService } from '../interfaces/services/validate-space.quiz.service.interface';
import { IDeleteNoteQuizService } from '../interfaces/services/delete-note.quiz.service.interface';
import { DeleteNoteQuizDto } from '../dto/delete-note.quiz.dto';

@AuthController('quiz')
export class DeleteNoteQuizController {
  constructor(
    @Inject(TYPES.services.IDeleteNoteQuizService)
    private deleteNoteQuizService: IDeleteNoteQuizService,
    @Inject(TYPES.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService
  ) { }

  @Post('note/delete')
  @Roles(Role.SpaceAdmin)
  async handler(
    @Body() deleteDto: DeleteNoteQuizDto,
    @SpaceId() spaceId: number
  ) {
    await this.validateSpaceQuizService.execute(spaceId, deleteDto.quizId)

    try {
      await this.deleteNoteQuizService.execute(deleteDto);
    } catch (e) {
      console.log("🚀 ~ DeleteNoteQuizController ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }
}

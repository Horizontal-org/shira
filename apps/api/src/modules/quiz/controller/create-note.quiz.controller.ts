import { Body, Inject, Post, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { CreateNoteQuizDto } from '../dto/create-note.quiz.dto';
import { TYPES } from '../interfaces';
import { ICreateNoteQuizService } from '../interfaces/services/create-note.quiz.service.interface';
import { IValidateSpaceQuizService } from '../interfaces/services/validate-space.quiz.service.interface';
import { SpaceId } from 'src/modules/auth/decorators';

@AuthController('quiz')
export class CreateNoteQuizController {
  constructor(
    @Inject(TYPES.services.ICreateNoteQuizService)
    private createNoteService: ICreateNoteQuizService,
    @Inject(TYPES.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService
  ) {}

  @Post('note')
  @Roles(Role.SpaceAdmin)
  async handler(
    @Body() newNote: CreateNoteQuizDto,
    @SpaceId() spaceId: number
  ) {
    await this.validateSpaceQuizService.execute(spaceId, newNote.quizId)

    try {
      await this.createNoteService.execute(newNote);
    } catch (e) {
      console.log("🚀 ~ CreateNoteQuizController ~ handler ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }
}

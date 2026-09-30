import { Body, Inject, Post, UnprocessableEntityException } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { CreateNoteDto } from '../dto/create.note.dto';
import { TYPES } from '../interfaces';
import { ICreateNoteService } from '../interfaces/services/create.note.service.interface';
import { TYPES as TYPES_QUIZ } from 'src/modules/quiz/interfaces';
import { IValidateSpaceQuizService } from 'src/modules/quiz/interfaces/services/validate-space.quiz.service.interface';
import { SpaceId } from 'src/modules/auth/decorators';

@AuthController('note')
export class CreateNoteController {
  constructor(
    @Inject(TYPES.services.ICreateNoteService)
    private createNoteService: ICreateNoteService,
    @Inject(TYPES_QUIZ.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService
  ) {}

  @Post()
  @Roles(Role.SpaceAdmin)
  async handler(
    @Body() newNote: CreateNoteDto,
    @SpaceId() spaceId: number
  ) {
    await this.validateSpaceQuizService.execute(spaceId, newNote.quizId)

    try {
      await this.createNoteService.execute(newNote);
    } catch (e) {
      console.log("🚀 ~ CreateNoteController ~ handler ~ e:", e)
      throw new UnprocessableEntityException()
    }
  }
}

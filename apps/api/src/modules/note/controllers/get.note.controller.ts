import { Get, Inject, Param, Query } from '@nestjs/common'
import { AuthController } from 'src/utils/decorators/auth-controller.decorator'
import { Roles } from 'src/modules/auth/decorators/roles.decorators'
import { Role } from 'src/modules/user/domain/role.enum'
import { TYPES } from '../interfaces'
import { IGetNoteService } from '../interfaces/services/get.note.service.interface'
import { TYPES as TYPES_QUIZ } from 'src/modules/quiz/interfaces'
import { IValidateSpaceQuizService } from 'src/modules/quiz/interfaces/services/validate-space.quiz.service.interface'
import { SpaceId } from 'src/modules/auth/decorators'

@AuthController('note')
export class GetNoteController {
  constructor(
    @Inject(TYPES.services.IGetNoteService)
    private getNoteService: IGetNoteService,
    @Inject(TYPES_QUIZ.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService
  ) {}

  @Get(':id')
  @Roles(Role.SpaceAdmin)
  async handler(
    @Param('id') id: string,
    @Query('quizId') quizId: string,
    @SpaceId() spaceId: number
  ) {
    await this.validateSpaceQuizService.execute(spaceId, Number(quizId))

    return this.getNoteService.execute(Number(id))
  }
}

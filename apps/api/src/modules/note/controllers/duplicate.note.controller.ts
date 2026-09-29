import { Body, Inject, Post } from '@nestjs/common'
import { AuthController } from 'src/utils/decorators/auth-controller.decorator'
import { Roles } from 'src/modules/auth/decorators/roles.decorators'
import { Role } from 'src/modules/user/domain/role.enum'
import { TYPES } from '../interfaces'
import { SpaceId } from 'src/modules/auth/decorators'
import { TYPES as TYPES_QUIZ } from 'src/modules/quiz/interfaces'
import { IValidateSpaceQuizService } from 'src/modules/quiz/interfaces/services/validate-space.quiz.service.interface'
import { IDuplicateNoteService } from '../interfaces/services/duplicate.note.service.interface'
import { DuplicateNoteDto } from '../dto/duplicate.note.dto'

@AuthController('note')
export class DuplicateNoteController {
  constructor(
    @Inject(TYPES.services.IDuplicateNoteService)
    private duplicateNoteService: IDuplicateNoteService,
    @Inject(TYPES_QUIZ.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService
  ) {}

  @Post('duplicate')
  @Roles(Role.SpaceAdmin)
  async handler(
    @Body() duplicateDto: DuplicateNoteDto,
    @SpaceId() spaceId: number
  ) {
    await this.validateSpaceQuizService.execute(spaceId, duplicateDto.quizId)

    await this.duplicateNoteService.execute(duplicateDto)
  }
}

import { Inject, NotFoundException, Post, Query, UnprocessableEntityException, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { QuizItem } from 'src/modules/quiz/domain/quiz_items.entity'
import { AuthController } from 'src/utils/decorators/auth-controller.decorator'
import { Roles } from 'src/modules/auth/decorators/roles.decorators'
import { Role } from 'src/modules/user/domain/role.enum'
import { SpaceId } from 'src/modules/auth/decorators'
import { TYPES as TYPES_QUIZ } from 'src/modules/quiz/interfaces'
import { IValidateSpaceQuizService } from 'src/modules/quiz/interfaces/services/validate-space.quiz.service.interface'
import { TYPES } from '../interfaces'
import { ICreateNoteImageService } from '../interfaces/services/create.note_image.service.interface'

@AuthController('note-image')
export class CreateNoteImageController {

  constructor(
    @Inject(TYPES.services.ICreateNoteImageService)
    private createNoteImageService: ICreateNoteImageService,
    @Inject(TYPES_QUIZ.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService,
    @InjectRepository(QuizItem)
    private readonly quizItemRepo: Repository<QuizItem>
  ) {}

  @Post('upload')
  @Roles(Role.SpaceAdmin)
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    }
  }))
  async uploadFile(
    @UploadedFile('file') file: Express.Multer.File,
    @Query('quizId') quizId: string,
    @Query('noteId') noteId: string | null,
    @SpaceId() spaceId: number
  ) {
    if (!quizId || !file) {
      throw new UnprocessableEntityException()
    }

    await this.validateSpaceQuizService.execute(spaceId, Number(quizId))

    if (noteId) {
      const quizItem = await this.quizItemRepo.findOne({
        where: {
          quizId: Number(quizId),
          entityType: 'note',
          entityId: Number(noteId),
        },
      })

      if (!quizItem) {
        throw new NotFoundException()
      }
    }

    return this.createNoteImageService.execute({
      file,
      quizId: Number(quizId),
      noteId: noteId ? Number(noteId) : null
    })
  }
}

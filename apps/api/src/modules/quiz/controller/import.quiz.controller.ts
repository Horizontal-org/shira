import { Body, Inject, Post, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthController } from 'src/utils/decorators/auth-controller.decorator'
import { Roles } from 'src/modules/auth/decorators/roles.decorators'
import { Role } from 'src/modules/user/domain/role.enum'
import { LoggedUser } from 'src/modules/auth/decorators'
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto'
import { SubscriptionGuard } from 'src/modules/subscription/guards/subscription.guard'
import { SubscriptionDecorator } from 'src/modules/subscription/decorators/subscription.decorator'
import { CachedSubscription } from 'src/modules/subscription/dto/cached-response.dto'
import { InvalidZipStructureException } from 'src/modules/question/exceptions'
import { MulterQuestionImportExceptionFilter } from 'src/modules/question/filters/multer-question-import-exception.filter'
import { TYPES } from '../interfaces'
import { IValidateCreateQuizService } from '../interfaces/services/validate-create.quiz.service.interface'
import { IImportQuizService } from '../interfaces/services/import.quiz.service.interface'
import { ValidateQuizImportService } from '../services/validate-import.quiz.service'
import { ImportQuizDto } from '../dto/import-quiz.dto'

const MAX_IMPORT_FILE_SIZE = 50 * 1024 * 1024

@AuthController('quiz')
export class ImportQuizController {
  constructor(
    private validateQuizImportService: ValidateQuizImportService,
    @Inject(TYPES.services.IValidateCreateQuizService)
    private validateQuizService: IValidateCreateQuizService,
    @Inject(TYPES.services.IImportQuizService)
    private importQuizService: IImportQuizService,
  ) { }

  @Post('import')
  @Roles(Role.SpaceAdmin)
  @UseGuards(SubscriptionGuard)
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: MAX_IMPORT_FILE_SIZE },
  }))
  @UseFilters(MulterQuestionImportExceptionFilter)
  async import(
    @UploadedFile('file') file: Express.Multer.File,
    @Body() body: ImportQuizDto,
    @LoggedUser() user: LoggedUserDto,
    @SubscriptionDecorator() subscription?: CachedSubscription,
  ) {
    if (!file) {
      throw new InvalidZipStructureException('No file uploaded')
    }

    const space = user.activeSpace.space

    await this.validateQuizService.execute(subscription, body.visibility, space.id)

    const { questions } = await this.validateQuizImportService.validate(file.buffer)

    const quizId = await this.importQuizService.execute({
      title: body.title,
      questions,
      space,
      visibility: body.visibility,
    })

    return { quizId }
  }
}

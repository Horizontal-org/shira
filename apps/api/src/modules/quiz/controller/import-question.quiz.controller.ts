import { Inject, ParseIntPipe, Post, Query, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import * as path from 'path'
import { AuthController } from 'src/utils/decorators/auth-controller.decorator'
import { Roles } from 'src/modules/auth/decorators/roles.decorators'
import { Role } from 'src/modules/user/domain/role.enum'
import { SpaceId } from 'src/modules/auth/decorators/space-id.decorator'
import { ValidateQuestionImportService } from 'src/modules/question/services/validateImport.question.service'
import { InvalidZipStructureException } from 'src/modules/question/exceptions'
import { MulterQuestionImportExceptionFilter } from 'src/modules/question/filters/multer-question-import-exception.filter'
import { TYPES } from '../interfaces'
import { IValidateSpaceQuizService } from '../interfaces/services/validate-space.quiz.service.interface'
import { IAddQuestionToQuizService } from '../interfaces/services/add-question-to-quiz.quiz.service.interface'

const MAX_IMPORT_FILE_SIZE = 50 * 1024 * 1024 // 50MB

@AuthController('question')
export class ImportQuestionController {
  constructor(
    private validateQuestionImportService: ValidateQuestionImportService,
    @Inject(TYPES.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService,
    @Inject(TYPES.services.IAddQuestionToQuizService)
    private addQuestionToQuizService: IAddQuestionToQuizService,
  ) { }

  @Post('import')
  @Roles(Role.SpaceAdmin)
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: MAX_IMPORT_FILE_SIZE },
  }))
  @UseFilters(MulterQuestionImportExceptionFilter)
  async import(
    @UploadedFile('file') file: Express.Multer.File,
    @Query('quizId', ParseIntPipe) quizId: number,
    @SpaceId() spaceId: number,
  ) {
    if (!file) {
      throw new InvalidZipStructureException('No file uploaded')
    }

    await this.validateSpaceQuizService.execute(spaceId, quizId)

    const { metadata, contentHtml, assets } = await this.validateQuestionImportService.validate(file.buffer)

    const images = assets
      .map((asset) => ({
        id: parseAssetImageId(asset.fileName),
        name: asset.fileName,
        buffer: asset.buffer,
      }))
      .filter((image): image is { id: number; name: string; buffer: Buffer } => image.id !== null)

    const questionId = await this.addQuestionToQuizService.execute({
      quizId,
      name: metadata.name,
      content: contentHtml,
      isPhishing: metadata.isPhishing,
      app: { name: metadata.app },
      isFromTemplate: true,
      images,
      explanations: metadata.explanations,
    })

    return { questionId }
  }
}

function parseAssetImageId(fileName: string): number | null {
  const id = parseInt(path.basename(fileName, path.extname(fileName)), 10)
  return Number.isNaN(id) ? null : id
}

import { Inject, Injectable } from '@nestjs/common'
import { fileTypeFromBuffer } from 'file-type'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { formatISO } from 'date-fns'
import { NoteImage as NoteImageEntity } from '../domain'
import { CreateNoteImageDto } from '../dto/create.note_image.dto'
import { CreateNoteImageServiceResponse, ICreateNoteImageService } from '../interfaces/services/create.note_image.service.interface'
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface'
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces'
import { FileInvalidException } from 'src/modules/question_image/exceptions'

@Injectable()
export class CreateNoteImageService implements ICreateNoteImageService {

  constructor(
    @InjectRepository(NoteImageEntity)
    private readonly noteImageRepo: Repository<NoteImageEntity>,
    @Inject(TYPES_IMAGE.services.IImageService)
    private imageService: IImageService
  ) {}

  async execute(createNoteImageDto: CreateNoteImageDto): Promise<CreateNoteImageServiceResponse> {
    await this.validateFile(createNoteImageDto.file)

    const fileInfo = this.createFilePath(createNoteImageDto)
    const noteImage = new NoteImageEntity()

    noteImage.name = fileInfo.name
    noteImage.relativePath = fileInfo.path
    noteImage.quizId = createNoteImageDto.quizId

    if (createNoteImageDto.noteId) {
      noteImage.noteId = createNoteImageDto.noteId
    }

    const savedNI = await this.noteImageRepo.save(noteImage)

    await this.imageService.upload({
      file: createNoteImageDto.file,
      fileName: fileInfo.name,
      filePath: fileInfo.path
    })

    return {
      imageId: savedNI.id,
      url: await this.imageService.get(fileInfo.path)
    }
  }

  private async validateFile(file: Express.Multer.File) {
    const type = await fileTypeFromBuffer(file.buffer)

    if (!type || !['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(type.mime)) {
      throw new FileInvalidException()
    }
  }

  private createFilePath(createNoteImageDto: CreateNoteImageDto) {
    const now = formatISO(new Date())
    const name = now + '_' + this.cleanString(createNoteImageDto.file.originalname)
    const path = `note-images/${createNoteImageDto.quizId}/${name}`

    return {
      path,
      name
    }
  }

  private cleanString(input: string) {
    let output = ''
    for (let i = 0; i < input.length; i++) {
      if (input.charCodeAt(i) <= 127) {
        output += input.charAt(i)
      }
    }
    return output
  }
}

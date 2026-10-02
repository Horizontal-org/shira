import { CreateNoteImageDto } from "../../dto/create.note_image.dto"

export interface CreateNoteImageServiceResponse {
  url: string
  imageId: number
}

export interface ICreateNoteImageService {
  execute(createNoteImageDto: CreateNoteImageDto): Promise<CreateNoteImageServiceResponse>
}

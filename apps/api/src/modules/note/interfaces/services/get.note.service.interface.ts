import { ReadNoteImageDto } from 'src/modules/note_image/dto/read.note_image.dto'

export interface GetNoteServiceResponse {
  id: number
  name: string
  content: string
  images: ReadNoteImageDto[]
}

export interface IGetNoteService {
  execute(spaceId: number, id: number): Promise<GetNoteServiceResponse>
}

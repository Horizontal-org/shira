import { PublishQuizLibraryDto } from '../../dto/publish-quiz.library.dto'

export interface IPublishQuizLibraryService {
  execute(dto: PublishQuizLibraryDto): Promise<void>
}

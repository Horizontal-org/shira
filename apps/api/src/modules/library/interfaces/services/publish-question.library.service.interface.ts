import { PublishQuestionLibraryDto } from '../../dto/publish-question.library.dto'

export interface IPublishQuestionLibraryService {
  execute(dto: PublishQuestionLibraryDto): Promise<void>
}

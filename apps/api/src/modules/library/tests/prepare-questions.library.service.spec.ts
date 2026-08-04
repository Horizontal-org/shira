import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Question } from 'src/modules/question/domain'
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces'
import { PrepareQuestionsLibraryService } from '../services/prepare-questions.library.service'
import { TYPES } from '../interfaces'

jest.mock('src/utils/question-sanitizer.util', () => ({
  QuestionSanitizer: { extractImageIds: jest.fn() },
}))

import { QuestionSanitizer } from 'src/utils/question-sanitizer.util'

describe('PrepareQuestionsLibraryService', () => {
  let service: PrepareQuestionsLibraryService

  const mockQuestionRepo = {}

  const mockImageService = {
    download: jest.fn(),
  }

  const mockShiraLibraryService = {
    uploadImage: jest.fn(),
  }

  const extractImageIds = QuestionSanitizer.extractImageIds as jest.Mock

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrepareQuestionsLibraryService,
        { provide: getRepositoryToken(Question), useValue: mockQuestionRepo },
        { provide: TYPES_IMAGE.services.IImageService, useValue: mockImageService },
        { provide: TYPES.services.IShiraLibraryService, useValue: mockShiraLibraryService },
      ],
    }).compile()

    service = module.get<PrepareQuestionsLibraryService>(PrepareQuestionsLibraryService)
  })

  function extractByRegex(html: string): string[] {
    return [...html.matchAll(/data-image-id="(\d+)"/g)].map((m) => m[1])
  }

  const baseQuestion = () => ({
    name: 'Suspicious SMS',
    isPhising: 1,
    apps: [{ name: 'Outlook', type: 'email' }],
    questionTranslations: [{ content: '<p>See <img data-image-id="10"></p>' }],
    explanations: [
      {
        position: '1',
        index: '0',
        explanationTranslations: [{ content: '<p><img data-image-id="11"></p>' }],
      },
    ],
    images: [
      { id: 10, name: 'a.png', relativePath: 'question-images/1/a.png' },
      { id: 11, name: 'b.png', relativePath: 'question-images/1/b.png' },
    ],
  }) as unknown as Question

  it('returns null when the question has no apps', async () => {
    const question = { ...baseQuestion(), apps: [] } as unknown as Question

    await expect(service.prepareQuestionForPublishing(question)).resolves.toBeNull()
  })

  it('transfers each referenced image and remaps data-image-id in content and explanations', async () => {
    extractImageIds.mockImplementation(extractByRegex)
    mockImageService.download.mockImplementation(async (relativePath: string) => Buffer.from(relativePath))
    mockShiraLibraryService.uploadImage.mockImplementation(async (_buffer: Buffer, filename: string) => {
      const uploaded: Record<string, { id: number; relativePath: string }> = {
        'a.png': { id: 100, relativePath: 'question-template-images/a.png' },
        'b.png': { id: 200, relativePath: 'question-template-images/b.png' },
      }
      return uploaded[filename]
    })

    const result = await service.prepareQuestionForPublishing(baseQuestion())

    expect(result.content).toBe('<p>See <img data-image-id="100"></p>')
    expect(result.explanations[0].content).toBe('<p><img data-image-id="200"></p>')
    expect(result.templateImageIds).toEqual([100, 200])

    expect(mockImageService.download).toHaveBeenCalledWith('question-images/1/a.png')
    expect(mockImageService.download).toHaveBeenCalledWith('question-images/1/b.png')
    expect(mockShiraLibraryService.uploadImage).toHaveBeenCalledWith(Buffer.from('question-images/1/a.png'), 'a.png')
    expect(mockShiraLibraryService.uploadImage).toHaveBeenCalledWith(Buffer.from('question-images/1/b.png'), 'b.png')
  })

  it('leaves a data-image-id reference untouched when the image row cannot be found', async () => {
    extractImageIds.mockImplementation(extractByRegex)
    const question = {
      ...baseQuestion(),
      questionTranslations: [{ content: '<p><img data-image-id="999"></p>' }],
      explanations: [],
    } as unknown as Question

    const result = await service.prepareQuestionForPublishing(question)

    expect(result.content).toBe('<p><img data-image-id="999"></p>')
    expect(result.templateImageIds).toEqual([])
    expect(mockImageService.download).not.toHaveBeenCalled()
  })
})

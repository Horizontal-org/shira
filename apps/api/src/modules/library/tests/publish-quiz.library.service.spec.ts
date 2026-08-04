import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { NotFoundException } from '@nestjs/common'
import { Quiz } from 'src/modules/quiz/domain/quiz.entity'
import { PublishQuizLibraryService } from '../services/publish-quiz.library.service'
import { TYPES } from '../interfaces'

describe('PublishQuizLibraryService', () => {
  let service: PublishQuizLibraryService

  const mockQuizRepo = {
    findOne: jest.fn(),
  }

  const mockPrepareQuestionsService = {
    getQuestionsByQuizId: jest.fn(),
    prepareQuestionForPublishing: jest.fn(),
  }

  const mockShiraLibraryService = {
    publishQuiz: jest.fn(),
  }

  const author = {
    publicSpaceId: 'space-1',
    spaceName: 'space',
    spaceDisplayName: 'Space',
    organizationName: 'Org',
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublishQuizLibraryService,
        { provide: getRepositoryToken(Quiz), useValue: mockQuizRepo },
        { provide: TYPES.services.IPrepareQuestionsLibraryService, useValue: mockPrepareQuestionsService },
        { provide: TYPES.services.IShiraLibraryService, useValue: mockShiraLibraryService },
      ],
    }).compile()

    service = module.get<PublishQuizLibraryService>(PublishQuizLibraryService)
  })

  it('throws when the quiz cannot be found for the space', async () => {
    mockQuizRepo.findOne.mockResolvedValue(null)

    await expect(
      service.execute({ quizId: 1, spaceId: 2, author, langTagIds: [], tagIds: [] }),
    ).rejects.toBeInstanceOf(NotFoundException)

    expect(mockPrepareQuestionsService.getQuestionsByQuizId).not.toHaveBeenCalled()
  })

  it('throws when the quiz has no questions', async () => {
    mockQuizRepo.findOne.mockResolvedValue({ id: 1, title: 'Quiz' })
    mockPrepareQuestionsService.getQuestionsByQuizId.mockResolvedValue([])

    await expect(
      service.execute({ quizId: 1, spaceId: 2, author, langTagIds: [], tagIds: [] }),
    ).rejects.toBeInstanceOf(NotFoundException)

    expect(mockShiraLibraryService.publishQuiz).not.toHaveBeenCalled()
  })

  it('awaits each prepared question, filters out nulls, and sends fully-resolved questions with their templateImageIds', async () => {
    const questionWithApp = { id: 10 }
    const questionWithoutApp = { id: 11 }
    mockQuizRepo.findOne.mockResolvedValue({ id: 1, title: 'Phishing basics' })
    mockPrepareQuestionsService.getQuestionsByQuizId.mockResolvedValue([questionWithApp, questionWithoutApp])

    mockPrepareQuestionsService.prepareQuestionForPublishing.mockImplementation(async (question: { id: number }) => {
      if (question.id === 11) return null
      return {
        name: 'Suspicious SMS',
        isPhishing: true,
        content: '<p><img data-image-id="100"></p>',
        defaultApp: 'Outlook',
        appType: 'email',
        explanations: [],
        templateImageIds: [100, 200],
      }
    })

    await service.execute({ quizId: 1, spaceId: 2, author, langTagIds: [5], tagIds: [6] })

    expect(mockShiraLibraryService.publishQuiz).toHaveBeenCalledTimes(1)
    const sentPayload = mockShiraLibraryService.publishQuiz.mock.calls[0][0]

    expect(sentPayload.title).toBe('Phishing basics')
    expect(sentPayload.author).toEqual(author)
    expect(sentPayload.langTagIds).toEqual([5])
    expect(sentPayload.tagIds).toEqual([6])

    // Regression guard: previously `questions` was an array of unresolved Promises
    // (JSON.stringify would have serialized each entry to `{}`), and null entries
    // for app-less questions were never filtered out.
    expect(sentPayload.questions).toEqual([
      {
        name: 'Suspicious SMS',
        isPhishing: true,
        content: '<p><img data-image-id="100"></p>',
        defaultApp: 'Outlook',
        appType: 'email',
        explanations: [],
        templateImageIds: [100, 200],
      },
    ])
    expect(sentPayload.questions.every((q: unknown) => q !== null && typeof (q as Promise<unknown>).then !== 'function')).toBe(true)
  })
})

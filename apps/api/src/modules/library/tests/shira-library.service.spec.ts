import { Test, TestingModule } from '@nestjs/testing'
import { ShiraLibraryService } from '../services/shira-library.service'
import { TYPES } from '../interfaces'
import { LibraryRequestFailedException } from '../exceptions'

describe('ShiraLibraryService', () => {
  let service: ShiraLibraryService

  const mockLogger = {
    started: jest.fn(),
    succeeded: jest.fn(),
    failed: jest.fn(),
    requestError: jest.fn(),
  }

  const originalFetch = global.fetch
  const originalUrl = process.env.SHIRA_LIBRARY_URL

  beforeEach(async () => {
    jest.clearAllMocks()
    process.env.SHIRA_LIBRARY_URL = 'https://library.example.com'

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShiraLibraryService,
        { provide: TYPES.services.IShiraLibraryLoggerService, useValue: mockLogger },
      ],
    }).compile()

    service = module.get<ShiraLibraryService>(ShiraLibraryService)
  })

  afterAll(() => {
    global.fetch = originalFetch
    process.env.SHIRA_LIBRARY_URL = originalUrl
  })

  describe('uploadImage', () => {
    it('POSTs a multipart form with the file to the upload endpoint', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        status: 201,
        text: async () => JSON.stringify({ id: 5, relativePath: 'question-template-images/foo.png' }),
      })
      global.fetch = mockFetch as unknown as typeof fetch

      const result = await service.uploadImage(Buffer.from('bytes'), 'foo.png')

      expect(result).toEqual({ id: 5, relativePath: 'question-template-images/foo.png' })

      const [url, init] = mockFetch.mock.calls[0]
      expect(url.toString()).toBe('https://library.example.com/question-template-images/upload')
      expect(init.method).toBe('POST')
      expect(init.body).toBeInstanceOf(FormData)
      // Must not force a JSON content-type onto a multipart body — fetch needs to set its own boundary header.
      expect(init.headers['content-type']).toBeUndefined()
    })

    it('throws LibraryRequestFailedException when the request fails', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        text: async () => 'error',
      }) as unknown as typeof fetch

      await expect(service.uploadImage(Buffer.from('bytes'), 'foo.png')).rejects.toThrow(LibraryRequestFailedException)
    })

    it('throws LibraryRequestFailedException when SHIRA_LIBRARY_URL is not configured', async () => {
      process.env.SHIRA_LIBRARY_URL = ''

      await expect(service.uploadImage(Buffer.from('bytes'), 'foo.png')).rejects.toThrow(LibraryRequestFailedException)
    })
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { ServiceUnavailableException } from '@nestjs/common'
import { ImageService } from '../services/image.service'
import { MINIO_TOKEN } from '../decorators/minio.decorator'

describe('ImageService', () => {
  let service: ImageService

  const mockMinio = {
    getObject: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()
    process.env.IMAGE_BUCKET = 'test-bucket'

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageService,
        { provide: MINIO_TOKEN, useValue: mockMinio },
      ],
    }).compile()

    service = module.get<ImageService>(ImageService)
  })

  describe('download', () => {
    it('buffers the object stream into a single Buffer', async () => {
      async function* fakeStream() {
        yield Buffer.from('hello ')
        yield Buffer.from('world')
      }
      mockMinio.getObject.mockResolvedValueOnce(fakeStream())

      const result = await service.download('question-images/1/foo.png')

      expect(result).toEqual(Buffer.from('hello world'))
      expect(mockMinio.getObject).toHaveBeenCalledWith('test-bucket', 'question-images/1/foo.png')
    })

    it('throws ServiceUnavailableException when Minio fails', async () => {
      mockMinio.getObject.mockRejectedValueOnce(new Error('boom'))

      await expect(service.download('missing.png')).rejects.toThrow(ServiceUnavailableException)
    })
  })
})

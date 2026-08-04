import { Inject, Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { TYPES } from '../interfaces'
import { IShiraLibraryService } from '../interfaces/services/shira-library.service.interface'
import { IShiraLibraryLoggerService } from '../interfaces/services/shira-library-logger.service.interface'
import { LibraryRequestFailedException } from '../exceptions'

@Injectable()
export class ShiraLibraryService implements IShiraLibraryService {
  constructor(
    @Inject(TYPES.services.IShiraLibraryLoggerService)
    private readonly logger: IShiraLibraryLoggerService,
  ) { }

  async publishQuestion(data: Record<string, unknown>): Promise<void> {
    await this.request('/question-templates/publish', { method: 'POST', body: JSON.stringify(data) })
  }

  async publishQuiz(data: Record<string, unknown>): Promise<void> {
    await this.request('/quiz-templates/publish', { method: 'POST', body: JSON.stringify(data) })
  }

  async uploadImage(buffer: Buffer, filename: string): Promise<{ id: number; relativePath: string }> {
    const formData = new FormData()
    formData.append('file', new Blob([new Uint8Array(buffer)]), filename)
    return this.requestMultipart('/question-template-images/upload', formData)
  }

  private async request<T = void>(path: string, init?: RequestInit): Promise<T> {
    const baseUrl = process.env.SHIRA_LIBRARY_URL
    const trimmedBaseUrl = baseUrl?.trim() ?? ''

    if (!trimmedBaseUrl) {
      throw new LibraryRequestFailedException()
    }

    const method = init?.method ?? 'GET'
    const requestId = randomUUID()
    const url = new URL(path, trimmedBaseUrl.endsWith('/') ? trimmedBaseUrl : `${trimmedBaseUrl}/`)
    const startedAt = Date.now()
    const logContext = { requestId, method, url: url.toString() }

    this.logger.started(logContext)

    let response: Response
    try {
      response = await fetch(url, {
        ...init,
        headers: {
          'content-type': 'application/json',
          'x-request-id': requestId,
          ...(init?.headers ?? {}),
        },
      })
    } catch (error) {
      const duration = Date.now() - startedAt
      this.logger.requestError(logContext, duration, error.message, error.stack)
      throw new LibraryRequestFailedException()
    }

    const duration = Date.now() - startedAt

    if (!response.ok) {
      const message = await response.text()
      this.logger.failed(logContext, response.status, duration, message)
      throw new LibraryRequestFailedException()
    }

    this.logger.succeeded(logContext, response.status, duration)

    const text = await response.text()
    try {
      return (text ? JSON.parse(text) : undefined) as T
    } catch {
      return undefined as T
    }
  }

  private async requestMultipart<T>(path: string, formData: FormData): Promise<T> {
    const baseUrl = process.env.SHIRA_LIBRARY_URL
    const trimmedBaseUrl = baseUrl?.trim() ?? ''

    if (!trimmedBaseUrl) {
      throw new LibraryRequestFailedException()
    }

    const requestId = randomUUID()
    const url = new URL(path, trimmedBaseUrl.endsWith('/') ? trimmedBaseUrl : `${trimmedBaseUrl}/`)
    const startedAt = Date.now()
    const logContext = { requestId, method: 'POST', url: url.toString() }

    this.logger.started(logContext)

    let response: Response
    try {
      response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: { 'x-request-id': requestId },
      })
    } catch (error) {
      const duration = Date.now() - startedAt
      this.logger.requestError(logContext, duration, error.message, error.stack)
      throw new LibraryRequestFailedException()
    }

    const duration = Date.now() - startedAt

    if (!response.ok) {
      const message = await response.text()
      this.logger.failed(logContext, response.status, duration, message)
      throw new LibraryRequestFailedException()
    }

    this.logger.succeeded(logContext, response.status, duration)

    const text = await response.text()
    try {
      return (text ? JSON.parse(text) : undefined) as T
    } catch {
      return undefined as T
    }
  }
}

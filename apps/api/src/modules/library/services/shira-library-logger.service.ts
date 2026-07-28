import { Injectable } from '@nestjs/common'
import { ApiLogger } from 'src/utils/logger/api-logger.service'
import { IShiraLibraryLoggerService, ShiraLibraryLogContext } from '../interfaces/services/shira-library-logger.service.interface'

@Injectable()
export class ShiraLibraryLoggerService implements IShiraLibraryLoggerService {
  private readonly logger = new ApiLogger(ShiraLibraryLoggerService.name)

  started(context: ShiraLibraryLogContext) {
    this.logger.log({ name: 'ShiraLibraryRequest', event: 'started', ...this.buildBaseContext(context) })
  }

  succeeded(context: ShiraLibraryLogContext, status: number, durationMs: number) {
    this.logger.log({ name: 'ShiraLibraryRequest', event: 'succeeded', ...this.buildBaseContext(context), status, duration_ms: durationMs })
  }

  failed(context: ShiraLibraryLogContext, status: number, durationMs: number, message: string) {
    this.logger.error({ name: 'ShiraLibraryRequest', event: 'failed', ...this.buildBaseContext(context), status, duration_ms: durationMs, message })
  }

  requestError(context: ShiraLibraryLogContext, durationMs: number, message: string, stack?: string) {
    this.logger.error({ name: 'ShiraLibraryRequest', event: 'error', ...this.buildBaseContext(context), duration_ms: durationMs, message }, stack)
  }

  private buildBaseContext(context: Partial<ShiraLibraryLogContext>): Record<string, unknown> {
    const result: Record<string, unknown> = {}
    if (context.requestId) result.requestId = context.requestId
    if (context.method) result.method = context.method
    if (context.url) result.url = context.url
    return result
  }
}

import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ApiLogger } from '../logger/api-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: ApiLogger) {
    this.logger.setContext(LoggingInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpCtx = context.switchToHttp();
    const request = httpCtx.getRequest<any>();

    const method = request?.method;
    const url = request?.url;

    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - now;
        this.logger.log(`HTTP ${method} ${url} -> 200 OK (${ms}ms)`);
      }),
      catchError((err) => {
        const { status, message, cause } = this.buildErrorInfo(err);
        const ms = Date.now() - now;

        const logLines = [
          `HTTP ${method} ${url} -> ${status}`,
          `Message: ${message}`,
          cause ? `Cause: ${cause}` : null,
          `Duration: ${ms}ms`,
        ]
          .filter(Boolean)
          .join(' | ');

        const stack = this.extractStack(err);

        this.logger.error(logLines, stack, 'Exception');

        // Rethrow so the exception filter still handles the response shaping
        return throwError(() => err);
      }),
    );
  }

  private buildErrorInfo(err: unknown): {
    status: number;
    message: string;
    cause: string | null;
  } {
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let cause: string | null = null;

    if (err instanceof HttpException) {
      status = err.getStatus();
      const res = err.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else {
        const body = res as Record<string, any>;
        message = String(body.message ?? message);
        if (body.cause) {
          cause = String(body.cause);
        }
      }
    } else {
      const anyErr = err as any;
      if (anyErr?.message) message = String(anyErr.message);
      if (anyErr?.cause) cause = String(anyErr.cause);
      if (anyErr?.options?.cause) cause = String(anyErr.options.cause);
    }

    return { status, message, cause };
  }

  private extractStack(err: unknown): string | undefined {
    if (err && typeof err === 'object' && 'stack' in err) {
      return (err as any).stack;
    }
    return undefined;
  }
}

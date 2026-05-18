import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ApiLogger } from 'src/utils/logger/api-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: ApiLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url } = this.getRequestInfo(context);
    const startedAt = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          { method, url, status: 200, duration_ms: Date.now() - startedAt },
          LoggingInterceptor.name,
        );
      }),
      catchError((err) => this.logAndRethrowError(err, { method, url, startedAt })),
    );
  }

  private getRequestInfo(context: ExecutionContext): { method: string; url: string } {
    const request = context.switchToHttp().getRequest<any>();
    return { method: request?.method ?? '', url: request?.url ?? '' };
  }

  private logAndRethrowError(err: unknown, ctx: RequestLogContext) {
    const duration_ms = Date.now() - ctx.startedAt;

    if (err instanceof HttpException) {
      try {
        const { status, message, cause } = this.buildErrorInfo(err);
        const payload: Record<string, unknown> = {
          method: ctx.method,
          url: ctx.url,
          status,
          duration_ms,
          message,
        };
        if (cause) payload.cause = cause;

        this.logger.error(payload, this.extractStack(err), 'Exception');
      } catch (loggingErr) {
        const e = loggingErr as any;
        this.logger.error(
          `Error in LoggingInterceptor: ${e?.message}`,
          e?.stack,
          'LoggingInterceptor',
        );
      }
    }

    return throwError(() => err);
  }

  private buildErrorInfo(err: HttpException): {
    status: number;
    message: string;
    cause: string | null;
  } {
    const status = err.getStatus();
    const res = err.getResponse();

    let message = 'Unknown error';
    let cause: string | null = null;

    if (typeof res === 'string') {
      message = res;
    } else if (res && typeof res === 'object') {
      const body = res as Record<string, any>;
      if (body.message) message = String(body.message);
      if (body.cause) cause = String(body.cause);
    }

    const anyErr = err as any;
    if (!cause && anyErr?.cause) cause = String(anyErr.cause);
    if (!cause && anyErr?.options?.cause) cause = String(anyErr.options.cause);

    return { status, message, cause };
  }

  private extractStack(err: unknown): string {
    if (err && typeof err === 'object' && 'stack' in err) {
      return (err as any).stack;
    }
    return '';
  }
}

type RequestLogContext = {
  method: string;
  url: string;
  startedAt: number;
};

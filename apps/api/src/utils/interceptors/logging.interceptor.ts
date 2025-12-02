import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ApiLogger } from '../../modules/learner/logger/api-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: ApiLogger) {
    this.logger.setContext(LoggingInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url } = this.getRequestInfo(context);
    const startedAt = Date.now();
    const baseContext: RequestLogContext = { method, url, startedAt };

    return next.handle().pipe(
      tap(() => this.logSuccess(baseContext)),
      catchError((err) => this.logAndRethrowError(err, baseContext)),
    );
  }

  // get context
  private getRequestInfo(context: ExecutionContext): { method: string; url: string } {
    const httpCtx = context.switchToHttp();
    const request = httpCtx.getRequest<any>();

    return {
      method: request?.method ?? '',
      url: request?.url ?? '',
    };
  }

  private logSuccess(ctx: RequestLogContext): void {
    const duration = this.getDuration(ctx.startedAt);
    this.logger.log(`HTTP ${ctx.method} ${ctx.url} -> 200 OK (${duration}ms)`);
  }

  // capture metadata and stack traces
  private logAndRethrowError(err: unknown, ctx: RequestLogContext) {
    const duration = this.getDuration(ctx.startedAt);

    if (err instanceof HttpException) {
      try {
        const { status, message, cause } = this.buildErrorInfo(err);
        const logLine = this.formatErrorLog({ ctx, duration, status, message, cause });

        this.logger.error(logLine, this.extractStack(err), 'Exception');
      } catch (loggingErr) {
        // never let the logger crash the pipeline
        const anyLoggingErr = loggingErr as any;
        this.logger.error(
          `Error in LoggingInterceptor while logging HttpException: ${anyLoggingErr?.message}`,
          anyLoggingErr?.stack,
          'LoggingInterceptor',
        );
      }
    }

    return throwError(() => err);
  }

  private formatErrorLog(params: {
    ctx: RequestLogContext;
    duration: number;
    status: number;
    message: string;
    cause: string | null;
  }): string {
    const { ctx, duration, status, message, cause } = params;
    return [
      `HTTP ${ctx.method} ${ctx.url} -> ${status}`,
      `Message: ${message}`,
      cause ? `Cause: ${cause}` : null,
      `Duration: ${duration}ms`,
    ]
      .filter(Boolean)
      .join(' | ');
  }

  // normalize into a uniform structure (only for HttpExceptions)
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

  // only log stacks when present
  private extractStack(err: unknown): string {
    if (err && typeof err === 'object' && 'stack' in err) {
      return (err as any).stack;
    }
    return '';
  }

  private getDuration(startedAt: number): number {
    return Date.now() - startedAt;
  }
}

type RequestLogContext = {
  method: string;
  url: string;
  startedAt: number;
};

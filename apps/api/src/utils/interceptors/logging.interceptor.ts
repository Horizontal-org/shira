import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
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

  // Check the context
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

  // Capture metadata and stack traces and rethrow the error
  private logAndRethrowError(err: unknown, ctx: RequestLogContext) {
    const duration = this.getDuration(ctx.startedAt);
    const { status, message, cause } = this.buildErrorInfo(err);
    const logLine = this.formatErrorLog({ ctx, duration, status, message, cause });

    this.logger.error(logLine, this.extractStack(err), 'Exception');

    return throwError(() => err);
  }

  private getDuration(startedAt: number): number {
    return Date.now() - startedAt;
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

  // Normalize into a uniform structure
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

  // Only log stacks when present
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

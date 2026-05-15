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

  private getRequestInfo(context: ExecutionContext): { method: string; url: string } {
    const request = context.switchToHttp().getRequest<any>();
    return { method: request?.method ?? '', url: request?.url ?? '' };
  }

  private logSuccess(ctx: RequestLogContext): void {
    const durationMs = this.getDuration(ctx.startedAt);
    this.logger.log({ method: ctx.method, url: ctx.url, status: 200, durationMs }, 'http request');
  }

  private logAndRethrowError(err: unknown, ctx: RequestLogContext) {
    const durationMs = this.getDuration(ctx.startedAt);

    if (err instanceof HttpException) {
      try {
        const { status, message, cause } = this.buildErrorInfo(err);
        this.logger.error(
          { method: ctx.method, url: ctx.url, status, durationMs, message, ...(cause ? { cause } : {}) },
          this.extractStack(err),
          'Exception',
        );
      } catch (loggingErr) {
        const e = loggingErr as any;
        this.logger.error(
          `Error in LoggingInterceptor while logging HttpException: ${e?.message}`,
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

  private getDuration(startedAt: number): number {
    return Date.now() - startedAt;
  }
}

type RequestLogContext = {
  method: string;
  url: string;
  startedAt: number;
};

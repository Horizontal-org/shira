import { Injectable, LoggerService } from '@nestjs/common';
import pino, { Logger } from 'pino';

const isDev = process.env.NODE_ENV !== 'production';

const root = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  ...(isDev && {
    transport: {
      target: 'pino-pretty',
      options: { colorize: true, translateTime: 'SYS:HH:MM:ss.l', ignore: 'pid,hostname' },
    },
  }),
});

@Injectable()
export class ApiLogger implements LoggerService {
  private logger: Logger;

  constructor(context = 'App') {
    this.logger = root.child({ context });
  }

  setContext(context: string): void {
    this.logger = root.child({ context });
  }

  log(message: unknown, contextOrDescription?: string): void {
    if (typeof message === 'object' && message !== null) {
      this.logger.info(message as object, contextOrDescription ?? '');
    } else {
      this.logger.info(String(message ?? ''));
    }
  }

  error(message: unknown, stack?: string, context?: string): void {
    const meta = { ...(stack ? { stack } : {}), ...(context ? { context } : {}) };
    if (typeof message === 'object' && message !== null) {
      this.logger.error({ ...(message as object), ...meta }, '');
    } else {
      this.logger.error(meta, String(message ?? ''));
    }
  }

  warn(message: unknown, context?: string): void {
    const meta = context ? { context } : {};
    if (typeof message === 'object' && message !== null) {
      this.logger.warn({ ...(message as object), ...meta }, '');
    } else {
      this.logger.warn(meta, String(message ?? ''));
    }
  }

  debug(message: unknown, context?: string): void {
    const meta = context ? { context } : {};
    if (typeof message === 'object' && message !== null) {
      this.logger.debug({ ...(message as object), ...meta }, '');
    } else {
      this.logger.debug(meta, String(message ?? ''));
    }
  }

  verbose(message: unknown, context?: string): void {
    const meta = context ? { context } : {};
    if (typeof message === 'object' && message !== null) {
      this.logger.trace({ ...(message as object), ...meta }, '');
    } else {
      this.logger.trace(meta, String(message ?? ''));
    }
  }
}

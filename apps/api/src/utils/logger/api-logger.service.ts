import { Injectable, LoggerService, LogLevel } from '@nestjs/common';

@Injectable()
export class ApiLogger implements LoggerService {
  private write(level: LogLevel, message: unknown, context?: string, stack?: string) {
    const base: Record<string, unknown> = {
      level,
      timestamp: new Date().toISOString(),
      context: context ?? 'App',
    };

    if (message && typeof message === 'object') {
      Object.assign(base, message);
    } else {
      base.message = message;
    }

    if (stack) base.stack = stack;

    process.stdout.write(JSON.stringify(base) + '\n');
  }

  log(message: unknown, context?: string) {
    this.write('log', message, context);
  }

  error(message: unknown, stack?: string, context?: string) {
    this.write('error', message, context, stack);
  }

  warn(message: unknown, context?: string) {
    this.write('warn', message, context);
  }

  debug(message: unknown, context?: string) {
    this.write('debug', message, context);
  }

  verbose(message: unknown, context?: string) {
    this.write('verbose', message, context);
  }
}

import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { clc } from '@nestjs/common/utils/cli-colors.util';

@Injectable()
export class ApiLogger extends ConsoleLogger {
  constructor(context?: string) {
    super(context, { timestamp: true });
  }

  private colorByLevel(level: LogLevel, text: string): string {
    switch (level) {
      case 'error':
        return clc.red(text);
      case 'warn':
        return clc.yellow(text);
      case 'debug':
        return clc.cyanBright(text);
      case 'verbose':
        return clc.magentaBright(text);
      case 'log':
      default:
        return clc.green(text);
    }
  }

  private buildContext(level: LogLevel, context?: string): string {
    const baseContext = context ?? this.context ?? 'App';
    const full = `${baseContext}`;
    return this.colorByLevel(level, full);
  }

  log(message: any, context?: string) {
    super.log(message, this.buildContext('log' as LogLevel, context));
  }

  error(message: any, stack?: string, context?: string) {
    super.error(
      message,
      stack,
      this.buildContext('error' as LogLevel, context),
    );
  }

  warn(message: any, context?: string) {
    super.warn(message, this.buildContext('warn' as LogLevel, context));
  }

  debug(message: any, context?: string) {
    super.debug(message, this.buildContext('debug' as LogLevel, context));
  }

  verbose(message: any, context?: string) {
    super.verbose(message, this.buildContext('verbose' as LogLevel, context));
  }
}

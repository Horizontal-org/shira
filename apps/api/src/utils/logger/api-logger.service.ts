import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { clc } from '@nestjs/common/utils/cli-colors.util';

@Injectable()
export class ApiLogger extends ConsoleLogger {
  constructor(context = 'App') {
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
    return this.colorByLevel(level, baseContext);
  }

  override log(message: unknown, context?: string) {
    super.log(message, this.buildContext('log', context));
  }

  override error(message: unknown, stack?: string, context?: string) {
    super.error(message, stack, this.buildContext('error', context));
  }

  override warn(message: unknown, context?: string) {
    super.warn(message, this.buildContext('warn', context));
  }

  override debug(message: unknown, context?: string) {
    super.debug(message, this.buildContext('debug', context));
  }

  override verbose(message: unknown, context?: string) {
    super.verbose(message, this.buildContext('verbose', context));
  }
}

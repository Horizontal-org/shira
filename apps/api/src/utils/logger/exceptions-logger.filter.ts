import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ApiLogger } from '../logger/api-logger.service';

@Catch()
export class AllExceptionsLoggerFilter implements ExceptionFilter {
  private readonly logger = new ApiLogger('Exception');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // Extract method and URL from the incoming request
    const method = (request as any)?.method;
    const url = (request as any)?.url;

    // Default status and response body for unexpected errors
    let status = 500;
    let responseBody: any = {
      statusCode: 500,
      message: 'Internal server error',
    };

    // Extract exception status and response
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        responseBody = {
          statusCode: status,
          message: res,
        };
      } else {
        const body = res as Record<string, any>;
        responseBody = {
          statusCode: status,
          ...body,
        };
      }
    }

    // Attempt to extract a cause for the error
    let cause: string | null = null;

    if (responseBody.cause) {
      cause = String(responseBody.cause);
    } else if (exception) {
      if (exception.cause) {
        cause = String(exception.cause);
      }
      else if (exception.options?.cause) {
        cause = String(exception.options.cause);
      }
    }

    // Log formatting
    const logLines = [
      `HTTP ${status} ${method} ${url}`,
      `Message: ${responseBody.message}`,
      cause ? `Cause: ${cause}` : null,
    ]
      .filter(Boolean)
      .join(' | ');

    // Log and include the original stack
    this.logger.error(logLines, exception?.stack, 'Exception');

    return (response as any).status(status).json(responseBody);
  }
}

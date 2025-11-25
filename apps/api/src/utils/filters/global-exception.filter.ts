import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();

    const { status, body } = this.buildResponse(exception);

    return response.status(status).json(body);
  }

  private buildResponse(exception: unknown): { status: number; body: any } {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        return {
          status,
          body: {
            statusCode: status,
            message: res,
          },
        };
      }

      const body = res as Record<string, any>;
      return {
        status,
        body: {
          statusCode: status,
          ...body,
        },
      };
    }

    // Return generic internal server error for unhandled exceptions
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    return {
      status,
      body: {
        statusCode: status,
        message: 'Internal server error',
      },
    };
  }
}

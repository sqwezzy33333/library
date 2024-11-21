import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { LogService } from './log.service';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const exceptionResponse = exception.getResponse();
    let additionalMessage: null | string = null;
    if (typeof exceptionResponse === 'object') {
      additionalMessage = exceptionResponse['message'] === exception.message ? null : exceptionResponse['message'];
    }
    let status = exception.getStatus();
    let exceptionMessage = exception.message;
    if (!(exception instanceof HttpException)) {
      status = 500;
      exceptionMessage = 'internal server error';
    }
    const message = `Message: ${exceptionMessage}. Status code: ${status}`;
    this.logService.writeError(message);

    const responsePayload = {
      message: exception.message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request),
      additional: additionalMessage,
    };

    httpAdapter.reply(response, responsePayload, status);
  }

  constructor(
    private logService: LogService,
    private httpAdapterHost: HttpAdapterHost,
  ) {
  }
}

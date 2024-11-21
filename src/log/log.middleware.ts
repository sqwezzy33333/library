import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LogService } from './log.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logService: LogService) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const message = `${req.method} - URL {${
        req.originalUrl
      }} - Body:${JSON.stringify(req.body)} - Query:${JSON.stringify(
        req.query,
      )}`;
      const statusMessage = res.statusMessage;
      const statusCode = res.statusCode;
      this.logService.writeLog(message);
      if (statusCode >= 400 && statusCode < 500) {
        this.logService.writeWarn(`${statusCode} ${statusMessage}`);
      } else if (statusCode >= 500) {
        this.logService.writeError(`${statusCode} ${statusMessage}`);
      } else {
        this.logService.writeLog(`${statusCode} ${statusMessage}`);
      }
    });
    next();
  }
}

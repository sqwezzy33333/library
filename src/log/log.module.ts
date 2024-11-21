import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception.filter';

@Module({
  providers: [
    LogService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
  exports: [LogService]
})
export class LogModule {}

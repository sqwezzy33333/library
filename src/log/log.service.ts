import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { appendFileSync } from 'fs';

const LOG_LEVELS: Record<number, string> = {
  0: 'ERROR',
  1: 'WARN',
  2: 'LOG',
  3: 'DEBUG',
  4: 'VERBOSE',
};

@Injectable()
export class LogService {
  level = 0;

  writeError(message: string) {
    return this.changeLevelAndWrite(0, message);
  }

  writeLog(message: string) {
    return this.changeLevelAndWrite(2, message);
  }

  writeWarn(message: string) {
    return this.changeLevelAndWrite(1, message);
  }

  writeVerbose(message: string) {
    return this.changeLevelAndWrite(4, message);
  }

  writeDebug(message: string) {
    return this.changeLevelAndWrite(3, message);
  }

  changeLevelAndWrite(level: number, message: any) {
    if (level > this.level) return false;
    const logMessage = `${
      LOG_LEVELS[level]
    }: ${new Date().toISOString()} - ${message}`;
    console.log(logMessage);
    const pathToFolder = path.join(__dirname, '..', '..', '..', 'logs');
    if (!fs.existsSync(pathToFolder)) {
      fs.mkdirSync(pathToFolder, { recursive: true });
    }
    const logFilename = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'logs',
      'temp.log',
    );
    let errorLogFilename;
    if (LOG_LEVELS[level] === 'error') {
      errorLogFilename = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'logs',
        'error-temp.log',
      );
    }

    try {
      const stats = fs.statSync(logFilename);
      const sizeInBytes = stats.size;
      if (errorLogFilename) {
        const errorLogStats = fs.statSync(errorLogFilename);
        const errorLogSizeInBytes = errorLogStats.size;
        if (
          errorLogSizeInBytes >=
          (parseInt(process.env.LOG_SIZE) || 10) * 1000
        ) {
          fs.renameSync(
            errorLogFilename,
            path.resolve(
              __dirname,
              '..',
              '..',
              '..',
              'logs',
              `error-log-${Date.now()}.log`,
            ),
          );
        }
      }

      if (sizeInBytes >= (parseInt(process.env.LOG_SIZE) || 10) * 1000) {
        fs.renameSync(
          logFilename,
          path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'logs',
            `log-${Date.now()}.log`,
          ),
        );
      }
    } catch (error) {
      // console.error(error);
    }
    appendFileSync(logFilename, logMessage + '\n');
    if (errorLogFilename) appendFileSync(errorLogFilename, logMessage + '\n');
    return true;
  }

  constructor() {
    const levelFromEnv = process.env.LOG_LEVELS;
    this.level = levelFromEnv ? parseInt(levelFromEnv) : 2;
  }
}

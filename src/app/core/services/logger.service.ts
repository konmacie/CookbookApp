import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export enum LogLevel {
  NONE,
  ERROR,
  WARNING,
  INFO,
  DEBUG,
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private _level: LogLevel = LogLevel.ERROR;

  constructor() {
    if ('loggingLevel' in environment) {
      this._level = LogLevel[environment.loggingLevel as keyof typeof LogLevel];
    }
  }

  private _shouldLog(logLevel: LogLevel): boolean {
    if (this._level === LogLevel.NONE) {
      return false;
    }
    return logLevel <= this._level;
  }

  public log(
    message?: any,
    level: LogLevel = LogLevel.DEBUG,
    ...optionalParams: any[]
  ) {
    if (this._shouldLog(level)) {
      switch (level) {
        case LogLevel.ERROR:
          console.error(message, ...optionalParams);
          break;
        case LogLevel.WARNING:
          console.warn(message, ...optionalParams);
          break;
        case LogLevel.INFO:
          console.info(message, ...optionalParams);
          break;
        default:
          console.debug(message, ...optionalParams);
          break;
      }
    }
  }

  public error(message?: any, ...optionalParams: any[]): void {
    this.log(message, LogLevel.ERROR, ...optionalParams);
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    this.log(message, LogLevel.WARNING, ...optionalParams);
  }

  public info(message?: any, ...optionalParams: any[]): void {
    this.log(message, LogLevel.INFO, ...optionalParams);
  }

  public debug(message?: any, ...optionalParams: any[]): void {
    this.log(message, LogLevel.DEBUG, ...optionalParams);
  }

  // public dir(item: any, options: any): void {
  //   if (this._shouldLog(level)) {
  //     console.dir(item, options);
  //   }
  // }

  // public table(tabularData?: any, protperties?: string[] | undefined): void {
  //   if (this.logging) {
  //     console.table(tabularData, protperties);
  //   }
  // }
}

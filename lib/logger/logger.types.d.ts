/**
 * Logger interface
 *
 * @export
 * @interface ILogger
 * @typedef {ILogger}
 */
export interface ILogger {
    fatal(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    debug(message: string, ...args: any[]): void;
    trace(message: string, ...args: any[]): void;
}
/**
 * Log Levels
 *
 * @export
 * @enum {number}
 */
export declare enum LogLevel {
    TRACE = 5,
    DEBUG = 4,
    INFO = 3,
    WARN = 2,
    ERROR = 1,
    FATAL = 0
}

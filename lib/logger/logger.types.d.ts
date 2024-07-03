/**
 * Logger interface
 *
 * @export
 * @interface ILogger
 * @typedef {ILogger}
 */
export interface ILogger {
    fatal(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    trace(...args: any[]): void;
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

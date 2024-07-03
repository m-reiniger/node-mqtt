import { ILogger, LogLevel } from "./logger.types";
/**
 * Basic console logger
 *
 * @export
 * @class ConsoleLogger
 * @typedef {ConsoleLogger}
 * @implements {ILogger}
 */
export declare class ConsoleLogger implements ILogger {
    private logLevel;
    /**
     * Creates an instance of ConsoleLogger.
     *
     * @constructor
     * @param {LogLevel} [logLevel=LogLevel.INFO]
     */
    constructor(logLevel?: LogLevel);
    /**
     * sets the log level
     *
     * @public
     * @param {LogLevel} logLevel
     */
    setLogLevel(logLevel: LogLevel): void;
    /**
     * log fatal message
     *
     * @public
     * @param {...any[]} args
     */
    fatal(...args: any[]): void;
    /**
     * log error message
     *
     * @public
     * @param {...any[]} args
     */
    error(...args: any[]): void;
    /**
     * log warning message
     *
     * @public
     * @param {...any[]} args
     */
    warn(...args: any[]): void;
    /**
     * log info message
     *
     * @public
     * @param {...any[]} args
     */
    info(...args: any[]): void;
    /**
     * log debug message
     *
     * @public
     * @param {...any[]} args
     */
    debug(...args: any[]): void;
    /**
     * log trace message
     *
     * @public
     * @param {...any[]} args
     */
    trace(...args: any[]): void;
}

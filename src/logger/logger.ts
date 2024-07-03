import { ILogger, LogLevel } from "./logger.types";


/**
 * Basic console logger
 *
 * @export
 * @class ConsoleLogger
 * @typedef {ConsoleLogger}
 * @implements {ILogger}
 */
export class ConsoleLogger implements ILogger {

    private logLevel: LogLevel = LogLevel.INFO;

    
    /**
     * Creates an instance of ConsoleLogger.
     *
     * @constructor
     * @param {LogLevel} [logLevel=LogLevel.INFO]
     */
    constructor(logLevel: LogLevel = LogLevel.INFO) {
        this.logLevel = logLevel;
    }

    
    /**
     * sets the log level
     *
     * @public
     * @param {LogLevel} logLevel
     */
    public setLogLevel(logLevel: LogLevel) {
        this.logLevel = logLevel;
    }

    
    /**
     * log fatal message
     *
     * @public
     * @param {...any[]} args
     */
    public fatal(...args: any[]): void {
        if (this.logLevel >= LogLevel.FATAL) {
            console.error(`[FATAL]`, ...args);
        }
    }

    /**
     * log error message
     *
     * @public
     * @param {...any[]} args
     */
    public error(...args: any[]): void {
        if (this.logLevel >= LogLevel.ERROR) {
            console.error(`[ERROR]`, ...args);
        }
    }
    
    /**
     * log warning message
     *
     * @public
     * @param {...any[]} args
     */
    public warn(...args: any[]): void {
        if (this.logLevel >= LogLevel.WARN) {
            console.warn(`[WARN]`, ...args);
        }
    }

    /**
     * log info message
     *
     * @public
     * @param {...any[]} args
     */
    public info(...args: any[]): void {
        if (this.logLevel >= LogLevel.INFO) {
            console.log(`[INFO]`, ...args);
        }
    }
    
    /**
     * log debug message
     *
     * @public
     * @param {...any[]} args
     */
    public debug(...args: any[]): void {
        if (this.logLevel >= LogLevel.DEBUG) {
            console.debug(`[DEBUG]`, ...args);
        }
    }
    
    /**
     * log trace message
     *
     * @public
     * @param {...any[]} args
     */
    public trace(...args: any[]): void {
        if (this.logLevel >= LogLevel.TRACE) {
            console.trace(`[TRACE]`, ...args);
        }
    }
}
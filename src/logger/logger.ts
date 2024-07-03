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
    public fatal(message: string, ...args: any[]): void {
        if (this.logLevel >= LogLevel.FATAL) {
            console.error(`[FATAL] ${message}`, ...args);
        }
    }

    /**
     * log error message
     *
     * @public
     * @param {...any[]} args
     */
    public error(message: string, ...args: any[]): void {
        if (this.logLevel >= LogLevel.ERROR) {
            console.error(`[ERROR] ${message}`, ...args);
        }
    }
    
    /**
     * log warning message
     *
     * @public
     * @param {...any[]} args
     */
    public warn(message: string, ...args: any[]): void {
        if (this.logLevel >= LogLevel.WARN) {
            console.warn(`[WARN] ${message}`, ...args);
        }
    }

    /**
     * log info message
     *
     * @public
     * @param {...any[]} args
     */
    public info(message: string, ...args: any[]): void {
        if (this.logLevel >= LogLevel.INFO) {
            console.log(`[INFO] ${message}`, ...args);
        }
    }
    
    /**
     * log debug message
     *
     * @public
     * @param {...any[]} args
     */
    public debug(message: string, ...args: any[]): void {
        if (this.logLevel >= LogLevel.DEBUG) {
            console.debug(`[DEBUG] ${message}`, ...args);
        }
    }
    
    /**
     * log trace message
     *
     * @public
     * @param {...any[]} args
     */
    public trace(message: string, ...args: any[]): void {
        if (this.logLevel >= LogLevel.TRACE) {
            console.trace(`[TRACE] ${message}`, ...args);
        }
    }
}
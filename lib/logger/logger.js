"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
const logger_types_1 = require("./logger.types");
/**
 * Basic console logger
 *
 * @export
 * @class ConsoleLogger
 * @typedef {ConsoleLogger}
 * @implements {ILogger}
 */
class ConsoleLogger {
    /**
     * Creates an instance of ConsoleLogger.
     *
     * @constructor
     * @param {LogLevel} [logLevel=LogLevel.INFO]
     */
    constructor(logLevel = logger_types_1.LogLevel.INFO) {
        this.logLevel = logger_types_1.LogLevel.INFO;
        this.logLevel = logLevel;
    }
    /**
     * sets the log level
     *
     * @public
     * @param {LogLevel} logLevel
     */
    setLogLevel(logLevel) {
        this.logLevel = logLevel;
    }
    /**
     * log fatal message
     *
     * @public
     * @param {...any[]} args
     */
    fatal(...args) {
        if (this.logLevel >= logger_types_1.LogLevel.FATAL) {
            console.error(`[FATAL]`, ...args);
        }
    }
    /**
     * log error message
     *
     * @public
     * @param {...any[]} args
     */
    error(...args) {
        if (this.logLevel >= logger_types_1.LogLevel.ERROR) {
            console.error(`[ERROR]`, ...args);
        }
    }
    /**
     * log warning message
     *
     * @public
     * @param {...any[]} args
     */
    warn(...args) {
        if (this.logLevel >= logger_types_1.LogLevel.WARN) {
            console.warn(`[WARN]`, ...args);
        }
    }
    /**
     * log info message
     *
     * @public
     * @param {...any[]} args
     */
    info(...args) {
        if (this.logLevel >= logger_types_1.LogLevel.INFO) {
            console.log(`[INFO]`, ...args);
        }
    }
    /**
     * log debug message
     *
     * @public
     * @param {...any[]} args
     */
    debug(...args) {
        if (this.logLevel >= logger_types_1.LogLevel.DEBUG) {
            console.debug(`[DEBUG]`, ...args);
        }
    }
    /**
     * log trace message
     *
     * @public
     * @param {...any[]} args
     */
    trace(...args) {
        if (this.logLevel >= logger_types_1.LogLevel.TRACE) {
            console.trace(`[TRACE]`, ...args);
        }
    }
}
exports.ConsoleLogger = ConsoleLogger;

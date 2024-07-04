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
    fatal(message, ...args) {
        if (this.logLevel >= logger_types_1.LogLevel.FATAL) {
            console.error(`[FATAL] ${message}`, ...args);
        }
    }
    /**
     * log error message
     *
     * @public
     * @param {...any[]} args
     */
    error(message, ...args) {
        if (this.logLevel >= logger_types_1.LogLevel.ERROR) {
            console.error(`[ERROR] ${message}`, ...args);
        }
    }
    /**
     * log warning message
     *
     * @public
     * @param {...any[]} args
     */
    warn(message, ...args) {
        if (this.logLevel >= logger_types_1.LogLevel.WARN) {
            console.warn(`[WARN] ${message}`, ...args);
        }
    }
    /**
     * log info message
     *
     * @public
     * @param {...any[]} args
     */
    info(message, ...args) {
        if (this.logLevel >= logger_types_1.LogLevel.INFO) {
            console.log(`[INFO] ${message}`, ...args);
        }
    }
    /**
     * log debug message
     *
     * @public
     * @param {...any[]} args
     */
    debug(message, ...args) {
        if (this.logLevel >= logger_types_1.LogLevel.DEBUG) {
            console.debug(`[DEBUG] ${message}`, ...args);
        }
    }
    /**
     * log trace message
     *
     * @public
     * @param {...any[]} args
     */
    trace(message, ...args) {
        if (this.logLevel >= logger_types_1.LogLevel.TRACE) {
            console.trace(`[TRACE] ${message}`, ...args);
        }
    }
}
exports.ConsoleLogger = ConsoleLogger;

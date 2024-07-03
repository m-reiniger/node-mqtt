"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = void 0;
/**
 * Log Levels
 *
 * @export
 * @enum {number}
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["TRACE"] = 5] = "TRACE";
    LogLevel[LogLevel["DEBUG"] = 4] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 3] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 1] = "ERROR";
    LogLevel[LogLevel["FATAL"] = 0] = "FATAL";
})(LogLevel || (exports.LogLevel = LogLevel = {}));

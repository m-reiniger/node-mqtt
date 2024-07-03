"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQTTBroker = exports.defaultBrokerOptions = void 0;
const tls_1 = require("tls");
const net_1 = require("net");
const aedes_1 = __importDefault(require("aedes"));
const logger_1 = require("../logger/logger");
/**
 * default option set for MQTT broker
 *
 * @type {MQTTBrokerOptions}
 */
exports.defaultBrokerOptions = {
    port: 1883,
    auth: {
        useAuth: false
    },
    tls: {
        useTLS: false
    }
};
/**
 * MQTT Broker
 *
 * @export
 * @class MQTTBroker
 * @typedef {MQTTBroker}
 */
class MQTTBroker {
    /**
     * Creates an instance of MQTTBroker.
     * @param {MQTTBrokerOptions} options
     * @param {ILogger} [logger=new ConsoleLogger()]
     */
    constructor(options, logger = new logger_1.ConsoleLogger()) {
        this.options = exports.defaultBrokerOptions;
        this.options = options;
        this.logger = logger;
    }
    /**
     * Starts the MQTT broker.
     *
     * @public
     * @param {DefaultCallback} [callback=() => { }]
     */
    start(callback = () => { }) {
        this.logger.info('[MQTTBroker] starting');
        // setting up aedes broker
        if (this.options.auth.useAuth) {
            this.logger.info('[MQTTBroker] setting up authentication');
            const brokerOptions = {
                authenticate: (client, username, password, callback) => {
                    const authorized = (username === this.options.auth.username && (password === null || password === void 0 ? void 0 : password.toString()) === this.options.auth.password);
                    callback(null, authorized);
                }
            };
            this.broker = new aedes_1.default(brokerOptions);
        }
        else {
            this.broker = new aedes_1.default();
        }
        this.bindEvents(this.broker);
        // setting up server
        if (this.options.tls.useTLS) {
            this.logger.info('[MQTTBroker] setting up TLS');
            const tlsOptions = {
                key: this.options.tls.key,
                cert: this.options.tls.cert
            };
            this.server = (0, tls_1.createServer)(tlsOptions, this.broker.handle);
        }
        else {
            this.server = (0, net_1.createServer)(this.broker.handle);
        }
        this.server.listen(this.options.port, () => {
            this.logger.info(`[MQTTBroker] started and listening on port: ${this.options.port}`);
            callback();
        });
    }
    /**
     * Stops the MQTT broker.
     */
    stop() {
        var _a, _b, _c;
        (_a = this.server) === null || _a === void 0 ? void 0 : _a.close();
        (_b = this.server) === null || _b === void 0 ? void 0 : _b.unref();
        (_c = this.broker) === null || _c === void 0 ? void 0 : _c.close();
    }
    bindEvents(aedes) {
        aedes.on('client', (client) => {
            this.logger.info(`[MQTTBroker] client connecting: ${client.id}`);
            client.on('connected', () => {
                this.logger.info(`[MQTTBroker] client connected: ${client.id}`);
            });
        });
        aedes.on('subscribe', (subscriptions, client) => {
            this.logger.debug(`[MQTTBroker] client subscribing, ${subscriptions}, ${client.id}`);
        });
        aedes.on('unsubscribe', (subscriptions, client) => {
            this.logger.debug(`[MQTTBroker] client unsubscribing, ${subscriptions}, ${client.id}`);
        });
        aedes.on('clientDisconnect', (client) => {
            this.logger.debug(`[MQTTBroker] client disconnecting, ${client.id}`);
        });
        aedes.on('clientError', (client, err) => {
            this.logger.error(`[MQTTBroker] client error, ${client.id}, ${err.message}`);
        });
        aedes.on('publish', (packet, client) => {
            this.logger.debug(`[MQTTBroker] client publishing, ${packet}, ${client === null || client === void 0 ? void 0 : client.id}`);
        });
        aedes.on('ack', (packet, client) => {
            this.logger.debug(`[MQTTBroker] client ack, ${packet}, ${client === null || client === void 0 ? void 0 : client.id}`);
        });
    }
}
exports.MQTTBroker = MQTTBroker;

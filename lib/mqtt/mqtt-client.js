"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQTTClient = exports.defaultClientOptions = void 0;
const mqtt_1 = __importDefault(require("mqtt"));
const logger_1 = require("../logger/logger");
/**
 * default option set for MQTT client
 *
 * @type {MQTTClientOptions}
 */
exports.defaultClientOptions = {
    port: 1883,
    host: 'localhost',
    auth: {
        useAuth: false,
    },
    tls: {
        useTLS: false,
    }
};
/**
 * Description placeholder
 *
 * @export
 * @class MQTTClient
 * @typedef {MQTTClient}
 */
class MQTTClient {
    /**
     * Creates an instance of MQTTClient.
     *
     * @constructor
     * @param {MQTTClientOptions} options
     * @param {ILogger} [logger=new ConsoleLogger()]
     */
    constructor(options, logger = new logger_1.ConsoleLogger()) {
        this.options = exports.defaultClientOptions;
        this.options = options;
        ;
        this.logger = logger;
    }
    /**
     * connects to the MQTT broker
     *
     * @public
     * @param {DefaultCallback} [callback=() => { }]
     */
    connect(callback = () => { }) {
        this.logger.info('[MQTTClient] connecting...');
        // setting up mqtt client options
        const mqttClientOptions = {
            port: this.options.port,
            host: this.options.host
        };
        if (this.options.auth.useAuth) {
            mqttClientOptions.username = this.options.auth.username;
            mqttClientOptions.password = this.options.auth.password;
        }
        if (this.options.tls.useTLS) {
            mqttClientOptions.protocol = 'mqtts';
            mqttClientOptions.key = this.options.tls.key;
            mqttClientOptions.cert = this.options.tls.cert;
            mqttClientOptions.rejectUnauthorized = false;
        }
        else {
            mqttClientOptions.protocol = 'mqtt';
        }
        // connecting to broker
        this.client = mqtt_1.default.connect(mqttClientOptions);
        this.bindEvents(callback);
    }
    /**
     * disconnects from the MQTT broker
     *
     * @public
     */
    stop() {
        this.client.end();
    }
    /**
     * Subscribes to a topic
     *
     * @public
     * @param {string} topic
     * @param {MessageCallback} messageHandler
     * @param {DefaultCallback} [callback=() => { }]
     */
    subscribe(topic, messageHandler, callback = () => { }) {
        this.client.subscribe(topic, (error) => {
            if (error) {
                this.logger.error(`[MQTTClient] error subscribing to ${topic}: ${error.message}`);
                callback(error);
            }
            else {
                this.logger.info(`[MQTTClient] subscribed to ${topic}`);
            }
        });
        this.client.on('message', (topic, message) => {
            messageHandler(topic, message);
        });
    }
    ;
    /**
     * Publishes a message to a topic
     *
     * @public
     * @param {string} topic
     * @param {string} message
     * @param {DefaultCallback} [callback=() => { }]
     */
    publish(topic, message, callback = () => { }) {
        this.client.publish(topic, message, (error) => {
            if (error) {
                this.logger.error(`[MQTTClient] error publishing to ${topic}: ${error.message}`);
                callback(error);
            }
            else {
                this.logger.debug(`[MQTTClient] published "${message}" to ${topic}`);
            }
        });
    }
    ;
    /**
     * Bind custom event handler
     *
     * @public
     * @param {keyof MqttClientEventCallbacks} event
     * @param {(...args: any[]) => void} callback
     * @returns {void) => void}
     */
    on(event, callback) {
        this.client.on(event, callback);
    }
    bindEvents(connectCallback) {
        // error
        this.client.on('error', (error) => {
            this.logger.error(`[MQTTClient] error: ${error.name}: ${error.code}, ${error.message}`);
            this.logger.trace(`[MQTTClient] error: `, error);
            connectCallback(error);
        });
        // connect
        this.client.on('connect', () => {
            this.logger.info(`[MQTTClient] connected to ${this.options.host}:${this.options.port}`);
            connectCallback();
        });
        // other events
        this.client.on('disconnect', () => {
            this.logger.debug('[MQTTClient] disconnecting');
        });
        this.client.on('close', () => {
            this.logger.info('[MQTTClient] connection closed');
        });
        this.client.on('reconnect', () => {
            this.logger.info('[MQTTClient] reconnecting');
        });
        this.client.on('offline', () => {
            this.logger.debug('[MQTTClient] offline');
        });
        this.client.on('end', () => {
            this.logger.debug('[MQTTClient] end');
        });
    }
}
exports.MQTTClient = MQTTClient;

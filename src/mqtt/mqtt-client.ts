import mqtt, { ErrorWithReasonCode, IClientOptions, MqttClientEventCallbacks, MqttClient as MqttClientLib } from 'mqtt';

import { DefaultCallback, MessageCallback, MQTTClientOptions } from './mqtt.types';
import { ILogger } from '../logger/logger.types';
import { ConsoleLogger } from '../logger/logger';


/**
 * default option set for MQTT client
 *
 * @type {MQTTClientOptions}
 */
export const defaultClientOptions: MQTTClientOptions = {
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
export class MQTTClient {

    private options: MQTTClientOptions = defaultClientOptions;
    private logger: ILogger;
    private client!: MqttClientLib;

    
    /**
     * Creates an instance of MQTTClient.
     *
     * @constructor
     * @param {MQTTClientOptions} options
     * @param {ILogger} [logger=new ConsoleLogger()]
     */
    constructor(options: MQTTClientOptions, logger: ILogger = new ConsoleLogger()) {
        this.options = options;;
        this.logger = logger;
    }

    
    /**
     * connects to the MQTT broker
     *
     * @public
     * @param {DefaultCallback} [callback=() => { }]
     */
    public connect(callback: DefaultCallback = () => { }) {
        this.logger.info('[MQTTClient] connecting...');

        // setting up mqtt client options
        const mqttClientOptions: IClientOptions = {
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
        } else {
            mqttClientOptions.protocol = 'mqtt';
        }

        // connecting to broker
        this.client = mqtt.connect(mqttClientOptions);

        this.bindEvents(callback);
    }

    
    /**
     * disconnects from the MQTT broker
     *
     * @public
     */
    public stop() {
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
    public subscribe(topic: string, messageHandler: MessageCallback, callback: DefaultCallback = () => { }) {
        this.client.subscribe(topic, (error) => {
            if (error) {
                this.logger.error(`[MQTTClient] error subscribing to ${topic}: ${error.message}`);
                callback(error);
            } else {
                this.logger.info(`[MQTTClient] subscribed to ${topic}`);
            }
        });

        this.client.on('message', (topic: string, message: Buffer) => {
            messageHandler(topic, message);
        });
    };

    
    /**
     * Publishes a message to a topic
     *
     * @public
     * @param {string} topic
     * @param {string} message
     * @param {DefaultCallback} [callback=() => { }]
     */
    public publish(topic: string, message: string, callback: DefaultCallback = () => { }) {
        this.client.publish(topic, message, (error) => {
            if (error) {
                this.logger.error(`[MQTTClient] error publishing to ${topic}: ${error.message}`);
                callback(error);
            } else {
                this.logger.debug(`[MQTTClient] published "${message}" to ${topic}`);
            }
        });
    };

    
    /**
     * Bind custom event handler
     *
     * @public
     * @param {keyof MqttClientEventCallbacks} event
     * @param {(...args: any[]) => void} callback
     * @returns {void) => void}
     */
    public on(event: keyof MqttClientEventCallbacks, callback: (...args: any[]) => void) {
        this.client.on(event, callback);
    }

    private bindEvents(connectCallback: DefaultCallback) {
        // error
        this.client.on('error', (error: Error | ErrorWithReasonCode) => {
            this.logger.error(`[MQTTClient] error: ${error.name}: ${(error as ErrorWithReasonCode).code}, ${error.message}`);
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
import { MqttClientEventCallbacks } from 'mqtt';
import { DefaultCallback, MessageCallback, MQTTClientOptions } from './mqtt.types';
import { ILogger } from '../logger/logger.types';
/**
 * default option set for MQTT client
 *
 * @type {MQTTClientOptions}
 */
export declare const defaultClientOptions: MQTTClientOptions;
/**
 * Description placeholder
 *
 * @export
 * @class MQTTClient
 * @typedef {MQTTClient}
 */
export declare class MQTTClient {
    private options;
    private logger;
    private client;
    /**
     * Creates an instance of MQTTClient.
     *
     * @constructor
     * @param {MQTTClientOptions} options
     * @param {ILogger} [logger=new ConsoleLogger()]
     */
    constructor(options: MQTTClientOptions, logger?: ILogger);
    /**
     * connects to the MQTT broker
     *
     * @public
     * @param {DefaultCallback} [callback=() => { }]
     */
    connect(callback?: DefaultCallback): void;
    /**
     * disconnects from the MQTT broker
     *
     * @public
     */
    stop(): void;
    /**
     * Subscribes to a topic
     *
     * @public
     * @param {string} topic
     * @param {MessageCallback} messageHandler
     * @param {DefaultCallback} [callback=() => { }]
     */
    subscribe(topic: string, messageHandler: MessageCallback, callback?: DefaultCallback): void;
    /**
     * Publishes a message to a topic
     *
     * @public
     * @param {string} topic
     * @param {string} message
     * @param {DefaultCallback} [callback=() => { }]
     */
    publish(topic: string, message: string, callback?: DefaultCallback): void;
    /**
     * Bind custom event handler
     *
     * @public
     * @param {keyof MqttClientEventCallbacks} event
     * @param {(...args: any[]) => void} callback
     * @returns {void) => void}
     */
    on(event: keyof MqttClientEventCallbacks, callback: (...args: any[]) => void): void;
    private bindEvents;
}

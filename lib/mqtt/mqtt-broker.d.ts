import { DefaultCallback, MQTTBrokerOptions } from './mqtt.types';
import { ILogger } from '../logger/logger.types';
/**
 * default option set for MQTT broker
 *
 * @type {MQTTBrokerOptions}
 */
export declare const defaultBrokerOptions: MQTTBrokerOptions;
/**
 * MQTT Broker
 *
 * @export
 * @class MQTTBroker
 * @typedef {MQTTBroker}
 */
export declare class MQTTBroker {
    private logger;
    private options;
    private broker;
    private server;
    /**
     * Creates an instance of MQTTBroker.
     * @param {MQTTBrokerOptions} options
     * @param {ILogger} [logger=new ConsoleLogger()]
     */
    constructor(options: MQTTBrokerOptions, logger?: ILogger);
    /**
     * Starts the MQTT broker.
     *
     * @public
     * @param {DefaultCallback} [callback=() => { }]
     */
    start(callback?: DefaultCallback): void;
    /**
     * Stops the MQTT broker.
     */
    stop(): void;
    private bindEvents;
}

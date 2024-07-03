import { createServer as createSecureServer, TlsOptions } from 'tls';
import { createServer as createInsecureServer, Server } from 'net';

import Aedes, { AedesOptions } from 'aedes';

import { DefaultCallback, MQTTBrokerOptions } from './mqtt.types';
import { ILogger } from '../logger/logger.types';
import { ConsoleLogger } from '../logger/logger';


/**
 * default option set for MQTT broker
 *
 * @type {MQTTBrokerOptions}
 */
export const defaultBrokerOptions: MQTTBrokerOptions = {
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
export class MQTTBroker {

    private logger: ILogger;
    private options: MQTTBrokerOptions = defaultBrokerOptions;
    private broker!: Aedes;
    private server!: Server;

    /**
     * Creates an instance of MQTTBroker.
     * @param {MQTTBrokerOptions} options
     * @param {ILogger} [logger=new ConsoleLogger()]
     */
    constructor(options: MQTTBrokerOptions, logger: ILogger = new ConsoleLogger()) {
        this.options = options;
        this.logger = logger;
    }

    
    /**
     * Starts the MQTT broker.
     *
     * @public
     * @param {DefaultCallback} [callback=() => { }]
     */
    public start(callback: DefaultCallback = () => { }) {
        this.logger.info('[MQTTBroker] starting');

        // setting up aedes broker
        if (this.options.auth.useAuth) {
            this.logger.info('[MQTTBroker] setting up authentication');

            const brokerOptions: AedesOptions = {
                authenticate: (client, username, password, callback) => {
                    const authorized = (username === this.options.auth.username && password?.toString() === this.options.auth.password);
                    callback(null, authorized);
                }
            };
            this.broker = new Aedes(brokerOptions);
        } else {
            this.broker = new Aedes();
        }
        this.bindEvents(this.broker);

        // setting up server
        if (this.options.tls.useTLS) {
            this.logger.info('[MQTTBroker] setting up TLS');
            const tlsOptions: TlsOptions = {
                key: this.options.tls.key,
                cert: this.options.tls.cert
            };
            this.server = createSecureServer(tlsOptions, this.broker.handle);
        } else {
            this.server = createInsecureServer(this.broker.handle);
        }

        this.server.listen(this.options.port, () => {
            this.logger.info(`[MQTTBroker] started and listening on port: ${this.options.port}`);
            callback();
        });
    }

    /**
     * Stops the MQTT broker.
     */
    public stop() {
        this.server?.close();
        this.server?.unref();
        this.broker?.close();
    }

    private bindEvents(aedes: Aedes) {
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
            this.logger.debug(`[MQTTBroker] client publishing, ${packet}, ${client?.id}`);
        });

        aedes.on('ack', (packet, client) => {
            this.logger.debug(`[MQTTBroker] client ack, ${packet}, ${client?.id}`);
        });
    }

}


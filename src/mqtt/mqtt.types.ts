import { ErrorWithReasonCode } from "mqtt";


/**
 * default callback
 *
 * @export
 * @typedef {DefaultCallback}
 */
export type DefaultCallback = (error?: Error | ErrorWithReasonCode) => void;


/**
 * callback for receiving messages
 *
 * @export
 * @typedef {MessageCallback}
 */
export type MessageCallback = (topic: string, payload: Buffer) => void;


/**
 * Options Set for MQTT Broker
 *
 * @export
 * @typedef {MQTTBrokerOptions}
 */
export type MQTTBrokerOptions = MQTTConnectionOptions & {
    port: number;
};


/**
 * Options Set for MQTT Client
 *
 * @export
 * @typedef {MQTTClientOptions}
 */
export type MQTTClientOptions = MQTTConnectionOptions & {
    port: number;
    host: string;
    clientId?: string;
};


/**
 * Connection Options for MQTT
 *
 * @export
 * @typedef {MQTTConnectionOptions}
 */
export type MQTTConnectionOptions = {
    auth: MQTTAuth;
    tls: MQTTTLS;
}


/**
 * Authentication Options for MQTT
 *
 * @export
 * @typedef {MQTTAuth}
 */
export type MQTTAuth = {
    useAuth: boolean;
    username?: string;
    password?: string;
};


/**
 * TLS Options for MQTT
 *
 * @export
 * @typedef {MQTTTLS}
 */
export type MQTTTLS = {
    useTLS: boolean;
    key?: string;
    cert?: string;
};
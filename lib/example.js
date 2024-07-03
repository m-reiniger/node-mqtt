"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("./logger/logger");
const logger_types_1 = require("./logger/logger.types");
const mqtt_broker_1 = require("./mqtt/mqtt-broker");
const mqtt_client_1 = require("./mqtt/mqtt-client");
const getAuth = () => {
    return {
        useAuth: true,
        username: 'username',
        password: '7ashdl-as9d8i-89mHJ'
    };
};
const getTLS = () => {
    return {
        useTLS: true,
        key: fs_1.default.readFileSync('cert/privkey.pem').toString(),
        cert: fs_1.default.readFileSync('cert/cert.pem').toString()
    };
};
const exampleTopic = 'things';
const startBroker = () => {
    const options = Object.assign(mqtt_broker_1.defaultBrokerOptions, { port: 8883 }, { auth: getAuth() }, { tls: getTLS() });
    const broker = new mqtt_broker_1.MQTTBroker(options, new logger_1.ConsoleLogger(logger_types_1.LogLevel.INFO));
    broker.start();
};
const startSubscriber = () => {
    const options = Object.assign(mqtt_client_1.defaultClientOptions, { port: 8883, host: 'localhost' }, { auth: getAuth() }, { tls: getTLS() });
    const client = new mqtt_client_1.MQTTClient(options, new logger_1.ConsoleLogger(logger_types_1.LogLevel.INFO));
    client.connect();
    client.subscribe(exampleTopic, (topic, message) => {
        console.log(`[Subscriber] received "${message.toString()}" on topic ${topic}`);
    });
    client.on('error', (error) => {
        console.error(error);
    });
};
const startPublisher = () => {
    const options = Object.assign(mqtt_client_1.defaultClientOptions, { port: 8883, host: 'localhost' }, { auth: getAuth() }, { tls: getTLS() });
    const client = new mqtt_client_1.MQTTClient(options, new logger_1.ConsoleLogger(logger_types_1.LogLevel.INFO));
    client.connect();
    setInterval(() => {
        client.publish(exampleTopic, `${Math.floor(Math.random() * 1000)} Hello from publisher`);
    }, 3000);
};
// RUNTIME
if (process.argv.length < 3) {
    console.error('Usage: node index.js <server|subscriber|publisher>');
    process.exit(1);
}
const mode = process.argv[2];
switch (mode) {
    case 'server':
        startBroker();
        break;
    case 'subscriber':
        startSubscriber();
        break;
    case 'publisher':
        startPublisher();
        break;
}

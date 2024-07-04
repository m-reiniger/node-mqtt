import fs from 'fs';

import { ConsoleLogger } from './logger/logger';
import { LogLevel } from './logger/logger.types';
import { MQTTBroker, defaultBrokerOptions } from './mqtt/mqtt-broker';
import { MQTTClient, defaultClientOptions } from './mqtt/mqtt-client';
import { MQTTBrokerOptions, MQTTClientOptions } from './mqtt/mqtt.types';


const getAuth = () => {
    return {
        useAuth: true,
        username: 'username',
        password: '7ashdl-as9d8i-89mHJ'
    };
}

const getTLS = () => {
    return {
        useTLS: true,
        key: fs.readFileSync('cert/privkey.pem').toString(),
        cert: fs.readFileSync('cert/cert.pem').toString()
    };
}

const exampleTopic = 'things';


const startBroker = () => {
    const options: MQTTBrokerOptions = Object.assign(defaultBrokerOptions, { port: 8883 }, { auth: getAuth() }, { tls: getTLS() });
    const broker = new MQTTBroker(options, new ConsoleLogger(LogLevel.INFO));
    broker.start();
}

const startSubscriber = () => {
    const options: MQTTClientOptions = Object.assign(defaultClientOptions, { port: 8883, host: 'localhost', clientId: 'client1' }, { auth: getAuth() }, { tls: getTLS() });
    const client = new MQTTClient(options, new ConsoleLogger(LogLevel.INFO));
    client.connect();

    client.subscribe(exampleTopic, (topic: string, message: Buffer) => {
        console.log(`[Subscriber] received "${message.toString()}" on topic ${topic}`);
    });

    client.on('error', (error) => {
        console.error(error);
    });
}

const startPublisher = () => {
    const options: MQTTClientOptions = Object.assign(defaultClientOptions, { port: 8883, host: 'localhost', clientId: 'client2' }, { auth: getAuth() }, { tls: getTLS() });
    const client = new MQTTClient(options, new ConsoleLogger(LogLevel.INFO));
    client.connect();

    setInterval(() => {
        client.publish(exampleTopic, `${Math.floor(Math.random()*1000)} Hello from publisher`);
    }, 3000);
}

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
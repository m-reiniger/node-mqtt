# Basic MQTT Broker and Client Implementation

This project is a Proof of Concept of a basic MQTT broker and client implementation in NodeJS/Typescript. MQTT (Message Queuing Telemetry Transport) is a lightweight messaging protocol commonly used in IoT (Internet of Things) applications.

I am using [Aedes](https://github.com/moscajs/aedes) as a messaging broker and [MQTT.js](https://github.com/mqttjs/MQTT.js) as client.

- [Basic MQTT Broker and Client Implementation](#basic-mqtt-broker-and-client-implementation)
  - [Features](#features)
  - [Example Usage](#example-usage)
  - [How to Use](#how-to-use)
    - [Broker](#broker)
      - [create options object](#create-options-object)
      - [create and start broker](#create-and-start-broker)
    - [Client](#client)
      - [create options object](#create-options-object-1)
      - [create client and connect](#create-client-and-connect)
      - [subscribe to a topic](#subscribe-to-a-topic)
      - [publish a message](#publish-a-message)
    - [Examples](#examples)
  - [API](#api)
  - [TLS](#tls)


## Features

This implementation supports:
* all in one solution
* insecure connections
* username/password authentication
* TLS connections
* Log Level Based Logging
* customizable event handlers
* client can act as both, subscriber and publisher

## Install Package

```
npm i --save @m-reiniger/node-mqtt
```

## Example Usage Standalone

Install Dependencies:
```
npm install
```

Build:
```
npm run build
```

Run Broker:
```
npm run broker
```

Rum Subscriber Client:
```
npm run subscriber
```

Run Publisher Client:
```
npm run publisher
```

## How to Use

### Broker

#### create options object
```TypeScript
const options = {
    port: 8883,
    auth: {
        useAuth: true,
        username: 'user',
        password: 'pass'
    },
    tls: {
        useTLS: true,
        key: '--- your key file contents here ---',
        cert: '--- your cert file contents here ---'
    }
}
```
#### create and start broker
```TypeScript
import { MQTTBroker } from "@m-reiniger/node-mqtt";

// create broker
const broker = new MQTTBroker(options);
// start broker server
broker.start();
```

### Client

#### create options object
```TypeScript
const options = {
    port: 8883,
    host: 'localhost'
    auth: {
        useAuth: true,
        username: 'user',
        password: 'pass'
    },
    tls: {
        useTLS: true,
        key: '--- your key file contents here ---',
        cert: '--- your cert file contents here ---'
    }
}
```
#### create client and connect
```TypeScript
import { MQTTClient } from "@m-reiniger/node-mqtt";

// create client
const client = new MQTTClient(options);
// connect to broker
client.connect();
```

#### subscribe to a topic
```TypeScript
client.subscribe('my/topic', (topic: string, message: Buffer) => {
    console.log(`received "${message.toString()}" on topic ${topic}`);
    // your code here
});
```

#### publish a message
```TypeScript
client.publish('my/topic', 'my message');
```

### Examples

See an example usage implementation in [src/example.ts](src/example.ts).

## API

See [API Docs](./docs/globals.md).

## TLS

In order to use TLS you need to create key and cert files first. You can use the provided `cert/*.pem` files for testing purposes, **BUT I HIGHLY RECOMMEND** to create your own.

To create a TLS/OpenSSL certificate for secure communication, you can follow the instructions provided in the link: [How to create TLS/OpenSSL Cert](https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/). This guide will walk you through the process of setting up a certificate for local HTTPS development.

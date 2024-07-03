[**node-mqtt**](../README.md) • **Docs**

***

[node-mqtt](../globals.md) / MQTTClient

# Class: MQTTClient

Description placeholder

## Export

MQTTClient

## Constructors

### new MQTTClient()

> **new MQTTClient**(`options`, `logger`?): [`MQTTClient`](MQTTClient.md)

Creates an instance of MQTTClient.

#### Parameters

• **options**: [`MQTTClientOptions`](../type-aliases/MQTTClientOptions.md)

• **logger?**: `ILogger` = `...`

#### Returns

[`MQTTClient`](MQTTClient.md)

#### Defined in

mqtt/mqtt-client.ts:46

## Methods

### connect()

> **connect**(`callback`?): `void`

connects to the MQTT broker

#### Parameters

• **callback?**: [`DefaultCallback`](../type-aliases/DefaultCallback.md) = `...`

#### Returns

`void`

#### Defined in

mqtt/mqtt-client.ts:58

***

### on()

> **on**(`event`, `callback`): `void`

Bind custom event handler

#### Parameters

• **event**: keyof `MqttClientEventCallbacks`

• **callback**

#### Returns

`void`

#### Defined in

mqtt/mqtt-client.ts:150

***

### publish()

> **publish**(`topic`, `message`, `callback`?): `void`

Publishes a message to a topic

#### Parameters

• **topic**: `string`

• **message**: `string`

• **callback?**: [`DefaultCallback`](../type-aliases/DefaultCallback.md) = `...`

#### Returns

`void`

#### Defined in

mqtt/mqtt-client.ts:130

***

### stop()

> **stop**(): `void`

disconnects from the MQTT broker

#### Returns

`void`

#### Defined in

mqtt/mqtt-client.ts:93

***

### subscribe()

> **subscribe**(`topic`, `messageHandler`, `callback`?): `void`

Subscribes to a topic

#### Parameters

• **topic**: `string`

• **messageHandler**: [`MessageCallback`](../type-aliases/MessageCallback.md)

• **callback?**: [`DefaultCallback`](../type-aliases/DefaultCallback.md) = `...`

#### Returns

`void`

#### Defined in

mqtt/mqtt-client.ts:106

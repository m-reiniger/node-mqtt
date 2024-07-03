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

[mqtt/mqtt-client.ts:46](https://github.com/m-reiniger/node-mqtt/blob/5c2b801763ed31382f793f2f239f593fba632c77/src/mqtt/mqtt-client.ts#L46)

## Methods

### connect()

> **connect**(`callback`?): `void`

connects to the MQTT broker

#### Parameters

• **callback?**: [`DefaultCallback`](../type-aliases/DefaultCallback.md) = `...`

#### Returns

`void`

#### Defined in

[mqtt/mqtt-client.ts:58](https://github.com/m-reiniger/node-mqtt/blob/5c2b801763ed31382f793f2f239f593fba632c77/src/mqtt/mqtt-client.ts#L58)

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

[mqtt/mqtt-client.ts:150](https://github.com/m-reiniger/node-mqtt/blob/5c2b801763ed31382f793f2f239f593fba632c77/src/mqtt/mqtt-client.ts#L150)

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

[mqtt/mqtt-client.ts:130](https://github.com/m-reiniger/node-mqtt/blob/5c2b801763ed31382f793f2f239f593fba632c77/src/mqtt/mqtt-client.ts#L130)

***

### stop()

> **stop**(): `void`

disconnects from the MQTT broker

#### Returns

`void`

#### Defined in

[mqtt/mqtt-client.ts:93](https://github.com/m-reiniger/node-mqtt/blob/5c2b801763ed31382f793f2f239f593fba632c77/src/mqtt/mqtt-client.ts#L93)

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

[mqtt/mqtt-client.ts:106](https://github.com/m-reiniger/node-mqtt/blob/5c2b801763ed31382f793f2f239f593fba632c77/src/mqtt/mqtt-client.ts#L106)

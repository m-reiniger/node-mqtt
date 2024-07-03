[**node-mqtt**](../README.md) • **Docs**

***

[node-mqtt](../globals.md) / MQTTBroker

# Class: MQTTBroker

MQTT Broker

## Export

MQTTBroker

## Constructors

### new MQTTBroker()

> **new MQTTBroker**(`options`, `logger`?): [`MQTTBroker`](MQTTBroker.md)

Creates an instance of MQTTBroker.

#### Parameters

• **options**: [`MQTTBrokerOptions`](../type-aliases/MQTTBrokerOptions.md)

• **logger?**: `ILogger` = `...`

#### Returns

[`MQTTBroker`](MQTTBroker.md)

#### Defined in

[mqtt/mqtt-broker.ts:46](https://github.com/m-reiniger/node-mqtt/blob/5c2b801763ed31382f793f2f239f593fba632c77/src/mqtt/mqtt-broker.ts#L46)

## Methods

### start()

> **start**(`callback`?): `void`

Starts the MQTT broker.

#### Parameters

• **callback?**: [`DefaultCallback`](../type-aliases/DefaultCallback.md) = `...`

#### Returns

`void`

#### Defined in

[mqtt/mqtt-broker.ts:58](https://github.com/m-reiniger/node-mqtt/blob/5c2b801763ed31382f793f2f239f593fba632c77/src/mqtt/mqtt-broker.ts#L58)

***

### stop()

> **stop**(): `void`

Stops the MQTT broker.

#### Returns

`void`

#### Defined in

[mqtt/mqtt-broker.ts:98](https://github.com/m-reiniger/node-mqtt/blob/5c2b801763ed31382f793f2f239f593fba632c77/src/mqtt/mqtt-broker.ts#L98)

[**@m-reiniger/node-mqtt**](../README.md) • **Docs**

***

[@m-reiniger/node-mqtt](../globals.md) / MQTTBroker

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

[mqtt/mqtt-broker.ts:46](https://github.com/m-reiniger/node-mqtt/blob/b302ddcdc732ee83501a3d6d414cae5a2507d06a/src/mqtt/mqtt-broker.ts#L46)

## Methods

### start()

> **start**(`callback`?): `void`

Starts the MQTT broker.

#### Parameters

• **callback?**: [`DefaultCallback`](../type-aliases/DefaultCallback.md) = `...`

#### Returns

`void`

#### Defined in

[mqtt/mqtt-broker.ts:58](https://github.com/m-reiniger/node-mqtt/blob/b302ddcdc732ee83501a3d6d414cae5a2507d06a/src/mqtt/mqtt-broker.ts#L58)

***

### stop()

> **stop**(): `void`

Stops the MQTT broker.

#### Returns

`void`

#### Defined in

[mqtt/mqtt-broker.ts:98](https://github.com/m-reiniger/node-mqtt/blob/b302ddcdc732ee83501a3d6d414cae5a2507d06a/src/mqtt/mqtt-broker.ts#L98)

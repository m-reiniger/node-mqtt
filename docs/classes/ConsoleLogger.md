[**@m-reiniger/node-mqtt**](../README.md) • **Docs**

***

[@m-reiniger/node-mqtt](../globals.md) / ConsoleLogger

# Class: ConsoleLogger

Basic console logger

## Export

ConsoleLogger

## Implements

## Implements

- `ILogger`

## Constructors

### new ConsoleLogger()

> **new ConsoleLogger**(`logLevel`?): [`ConsoleLogger`](ConsoleLogger.md)

Creates an instance of ConsoleLogger.

#### Parameters

• **logLevel?**: `LogLevel` = `LogLevel.INFO`

#### Returns

[`ConsoleLogger`](ConsoleLogger.md)

#### Defined in

[logger/logger.ts:23](https://github.com/m-reiniger/node-mqtt/blob/b302ddcdc732ee83501a3d6d414cae5a2507d06a/src/logger/logger.ts#L23)

## Methods

### debug()

> **debug**(`message`, ...`args`): `void`

log debug message

#### Parameters

• **message**: `string`

• ...**args**: `any`[]

#### Returns

`void`

#### Implementation of

`ILogger.debug`

#### Defined in

[logger/logger.ts:93](https://github.com/m-reiniger/node-mqtt/blob/b302ddcdc732ee83501a3d6d414cae5a2507d06a/src/logger/logger.ts#L93)

***

### error()

> **error**(`message`, ...`args`): `void`

log error message

#### Parameters

• **message**: `string`

• ...**args**: `any`[]

#### Returns

`void`

#### Implementation of

`ILogger.error`

#### Defined in

[logger/logger.ts:57](https://github.com/m-reiniger/node-mqtt/blob/b302ddcdc732ee83501a3d6d414cae5a2507d06a/src/logger/logger.ts#L57)

***

### fatal()

> **fatal**(`message`, ...`args`): `void`

log fatal message

#### Parameters

• **message**: `string`

• ...**args**: `any`[]

#### Returns

`void`

#### Implementation of

`ILogger.fatal`

#### Defined in

[logger/logger.ts:45](https://github.com/m-reiniger/node-mqtt/blob/b302ddcdc732ee83501a3d6d414cae5a2507d06a/src/logger/logger.ts#L45)

***

### info()

> **info**(`message`, ...`args`): `void`

log info message

#### Parameters

• **message**: `string`

• ...**args**: `any`[]

#### Returns

`void`

#### Implementation of

`ILogger.info`

#### Defined in

[logger/logger.ts:81](https://github.com/m-reiniger/node-mqtt/blob/b302ddcdc732ee83501a3d6d414cae5a2507d06a/src/logger/logger.ts#L81)

***

### setLogLevel()

> **setLogLevel**(`logLevel`): `void`

sets the log level

#### Parameters

• **logLevel**: `LogLevel`

#### Returns

`void`

#### Defined in

[logger/logger.ts:34](https://github.com/m-reiniger/node-mqtt/blob/b302ddcdc732ee83501a3d6d414cae5a2507d06a/src/logger/logger.ts#L34)

***

### trace()

> **trace**(`message`, ...`args`): `void`

log trace message

#### Parameters

• **message**: `string`

• ...**args**: `any`[]

#### Returns

`void`

#### Implementation of

`ILogger.trace`

#### Defined in

[logger/logger.ts:105](https://github.com/m-reiniger/node-mqtt/blob/b302ddcdc732ee83501a3d6d414cae5a2507d06a/src/logger/logger.ts#L105)

***

### warn()

> **warn**(`message`, ...`args`): `void`

log warning message

#### Parameters

• **message**: `string`

• ...**args**: `any`[]

#### Returns

`void`

#### Implementation of

`ILogger.warn`

#### Defined in

[logger/logger.ts:69](https://github.com/m-reiniger/node-mqtt/blob/b302ddcdc732ee83501a3d6d414cae5a2507d06a/src/logger/logger.ts#L69)

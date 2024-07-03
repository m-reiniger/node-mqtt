[**node-mqtt**](../README.md) • **Docs**

***

[node-mqtt](../globals.md) / ConsoleLogger

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

logger/logger.ts:23

## Methods

### debug()

> **debug**(...`args`): `void`

log debug message

#### Parameters

• ...**args**: `any`[]

#### Returns

`void`

#### Implementation of

`ILogger.debug`

#### Defined in

logger/logger.ts:93

***

### error()

> **error**(...`args`): `void`

log error message

#### Parameters

• ...**args**: `any`[]

#### Returns

`void`

#### Implementation of

`ILogger.error`

#### Defined in

logger/logger.ts:57

***

### fatal()

> **fatal**(...`args`): `void`

log fatal message

#### Parameters

• ...**args**: `any`[]

#### Returns

`void`

#### Implementation of

`ILogger.fatal`

#### Defined in

logger/logger.ts:45

***

### info()

> **info**(...`args`): `void`

log info message

#### Parameters

• ...**args**: `any`[]

#### Returns

`void`

#### Implementation of

`ILogger.info`

#### Defined in

logger/logger.ts:81

***

### setLogLevel()

> **setLogLevel**(`logLevel`): `void`

sets the log level

#### Parameters

• **logLevel**: `LogLevel`

#### Returns

`void`

#### Defined in

logger/logger.ts:34

***

### trace()

> **trace**(...`args`): `void`

log trace message

#### Parameters

• ...**args**: `any`[]

#### Returns

`void`

#### Implementation of

`ILogger.trace`

#### Defined in

logger/logger.ts:105

***

### warn()

> **warn**(...`args`): `void`

log warning message

#### Parameters

• ...**args**: `any`[]

#### Returns

`void`

#### Implementation of

`ILogger.warn`

#### Defined in

logger/logger.ts:69

import { describe, test, expect } from "@jest/globals"

import tls from 'tls';
import net from 'net';
import Aedes, { AedesOptions } from 'aedes';

import { ILogger } from '../logger/logger.types';
import { defaultBrokerOptions, MQTTBroker } from './mqtt-broker';

const testLogger: ILogger = {
    fatal: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
    trace: jest.fn()
};

jest.mock('Aedes');
const listenMock = jest.fn((port: number, callback: () => void) => callback());
jest.mock('net', () => ({
    createServer: jest.fn(() => ({
        listen: listenMock
    })),
}));
jest.mock('tls', () => ({
    createServer: jest.fn(() => ({
        listen: listenMock
    })),
}));

describe('MQTTBroker', () => {

    let broker: MQTTBroker;

    afterEach(() => {
        jest.clearAllMocks();
        //broker.stop();
    });

    test('should create', () => {
        const brokerOptions = defaultBrokerOptions;
        broker = new MQTTBroker(brokerOptions, testLogger);
        expect(broker).toBeDefined();
    });

    test('should start w/o auth or tls', (done) => {
        const brokerOptions = defaultBrokerOptions;
        broker = new MQTTBroker(brokerOptions, testLogger);

        broker.start(() => {
            try {
                expect(testLogger.info).toHaveBeenCalledWith('[MQTTBroker] starting');
                expect(testLogger.info).toHaveBeenCalledWith('[MQTTBroker] started and listening on port: 1883');
                expect(Aedes).toHaveBeenCalledWith();
                expect(net.createServer).toHaveBeenCalledWith(undefined);
                expect(listenMock).toHaveBeenCalledWith(1883, expect.any(Function));
                done();
            } catch (error) {
                done(error as Error);
            }
        });
    });

    test('should start w/ auth and w/o tls', (done) => {
        const brokerOptions = defaultBrokerOptions;
        brokerOptions.auth.useAuth = true;
        brokerOptions.auth.username = 'test';
        brokerOptions.auth.password = 'testPW';
        broker = new MQTTBroker(brokerOptions, testLogger);

        broker.start(() => {
            try {
                expect(testLogger.info).toHaveBeenCalledWith('[MQTTBroker] starting');
                expect(testLogger.info).toHaveBeenCalledWith('[MQTTBroker] started and listening on port: 1883');
                expect(Aedes).toHaveBeenCalledWith({"authenticate": expect.any(Function)});
                expect(net.createServer).toHaveBeenCalledWith(undefined);
                expect(listenMock).toHaveBeenCalledWith(1883, expect.any(Function));
                done();
            } catch (error) {
                done(error as Error);
            }
        });
    });

    test('should start w/ auth and tls', (done) => {
        const brokerOptions = defaultBrokerOptions;
        brokerOptions.port = 8883;
        brokerOptions.auth.useAuth = true;
        brokerOptions.auth.username = 'test';
        brokerOptions.auth.password = 'testPW';
        brokerOptions.tls.useTLS = true;
        brokerOptions.tls.key = 'key';
        brokerOptions.tls.cert = 'cert';
        broker = new MQTTBroker(brokerOptions, testLogger);

        broker.start(() => {
            try {
                expect(testLogger.info).toHaveBeenCalledWith('[MQTTBroker] starting');
                expect(testLogger.info).toHaveBeenCalledWith('[MQTTBroker] started and listening on port: 8883');
                expect(Aedes).toHaveBeenCalledWith({"authenticate": expect.any(Function)});
                expect(tls.createServer).toHaveBeenCalledWith({"cert": "cert", "key": "key"}, undefined);
                expect(listenMock).toHaveBeenCalledWith(8883, expect.any(Function));
                done();
            } catch (error) {
                done(error as Error);
            }
        });
    });

});
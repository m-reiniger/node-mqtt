"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQTTBroker = void 0;
const aedes_1 = __importDefault(require("aedes"));
const net_1 = require("net");
const PORT = 1883;
class MQTTBroker {
    constructor() {
        console.log('[MQTTBroker] starting');
        this.startBroker(PORT);
    }
    startBroker(port) {
        const aedes = new aedes_1.default();
        const server = (0, net_1.createServer)(aedes.handle);
        // setting up events
        aedes.on('client', (client) => {
            console.log('[MQTTBroker] client connecting', client.id);
            client.on('connected', () => {
                console.log('[MQTTBroker] client connected', client.id);
            });
        });
        aedes.on('subscribe', (subscriptions, client) => {
            console.log('[MQTTBroker] client subscribing', subscriptions, client.id);
        });
        aedes.on('unsubscribe', (subscriptions, client) => {
            console.log('[MQTTBroker] client unsubscribing', subscriptions, client.id);
        });
        aedes.on('clientDisconnect', (client) => {
            console.log('[MQTTBroker] client disconnecting', client.id);
        });
        aedes.on('clientError', (client, err) => {
            console.log('[MQTTBroker] client error', client.id, err.message, err.stack);
        });
        aedes.on('publish', (packet, client) => {
            console.log('[MQTTBroker] client publishing', packet, client === null || client === void 0 ? void 0 : client.id);
        });
        aedes.on('ack', (packet, client) => {
            console.log('[MQTTBroker] client ack', packet, client === null || client === void 0 ? void 0 : client.id);
        });
        server.listen(port, () => {
            console.log('[MQTTBroker] started and listening on port', port);
        });
    }
}
exports.MQTTBroker = MQTTBroker;
const broker = new MQTTBroker();

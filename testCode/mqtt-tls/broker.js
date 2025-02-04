"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQTTBroker = void 0;
const fs_1 = __importDefault(require("fs"));
const tls_1 = require("tls");
const aedes_1 = __importDefault(require("aedes"));
class MQTTBroker {
    constructor() {
        this.port = 1883;
        this.username = 'username';
        this.password = '7ashdl-as9d8i-89mHJ';
        this.key = fs_1.default.readFileSync('cert/privkey.pem');
        this.cert = fs_1.default.readFileSync('cert/cert.pem');
        console.log('[MQTTBroker] starting');
        this.startBroker(this.port);
    }
    startBroker(port) {
        const options = {
            authenticate: (client, username, password, callback) => {
                const authorized = (username === this.username && (password === null || password === void 0 ? void 0 : password.toString()) === this.password);
                callback(null, authorized);
            }
        };
        const tlsOptions = {
            key: this.key,
            cert: this.cert
        };
        const aedes = new aedes_1.default(options);
        const server = (0, tls_1.createServer)(tlsOptions, aedes.handle);
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
            console.log('[MQTTBroker] client error', client.id, err.message);
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
const fs_1 = __importDefault(require("fs"));
const mqtt_1 = __importDefault(require("mqtt"));
class Subscriber {
    constructor() {
        this.username = 'username';
        this.password = '7ashdl-as9d8i-89mHJ';
        this.key = fs_1.default.readFileSync('cert/privkey.pem');
        this.cert = fs_1.default.readFileSync('cert/cert.pem');
        console.log('[Subscriber] starting');
        this.startSubscriber();
    }
    startSubscriber() {
        const options = {
            port: 8883,
            host: 'localhost',
            protocol: 'mqtts',
            username: this.username,
            password: this.password,
            key: this.key,
            cert: this.cert,
            rejectUnauthorized: false,
        };
        this.client = mqtt_1.default.connect(options);
        this.client.on('error', (err) => {
            console.error(`[Subscriber] error`, err);
        });
        this.client.on('connect', () => {
            console.log('[Subscriber] connected to broker');
            this.subscribeToTopic('heartbeat');
        });
        this.client.on('message', (topic, message) => {
            console.log(`[Subscriber] received "${message.toString()}" on topic ${topic}`);
        });
        this.client.on('close', () => {
            console.log('[Subscriber] connection closed');
        });
        this.client.on('reconnect', () => {
            console.log('[Subscriber] reconnecting');
        });
        this.client.on('offline', () => {
            console.log('[Subscriber] offline');
        });
        this.client.on('end', () => {
            console.log('[Subscriber] end');
        });
    }
    subscribeToTopic(topic) {
        this.client.subscribe(topic, (err) => {
            if (err) {
                console.error(`[Subscriber] error subscribing to heartbeat ${topic}`, err);
            }
            else {
                console.log(`[Subscriber] subscribed to top ${topic}`);
            }
        });
    }
}
exports.Subscriber = Subscriber;
const subscriber = new Subscriber();

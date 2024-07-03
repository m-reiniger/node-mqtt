"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
const mqtt_1 = __importDefault(require("mqtt"));
class Publisher {
    constructor() {
        this.username = 'username';
        this.password = '7ashdl-as9d8i-89mHJ';
        console.log('[Publisher] starting');
        this.startPublisher();
    }
    startPublisher() {
        const options = {
            username: this.username,
            password: this.password
        };
        this.client = mqtt_1.default.connect('mqtt://localhost:1883', options);
        this.client.on('error', (err) => {
            console.error(`[Publisher] error`, err);
        });
        this.client.on('connect', () => {
            console.log('[Publisher] connected to broker');
            setInterval(() => {
                this.publishMessage('heartbeat', `${Math.floor(Math.random() * 1000)} Hello from publisher`);
            }, 3000);
        });
        this.client.on('message', (topic, message) => {
            console.log(`[Publisher] received message on topic ${topic}: ${message.toString()}`);
        });
        this.client.on('close', () => {
            console.log('[Publisher] connection closed');
        });
        this.client.on('reconnect', () => {
            console.log('[Publisher] reconnecting');
        });
        this.client.on('offline', () => {
            console.log('[Publisher] offline');
        });
        this.client.on('end', () => {
            console.log('[Publisher] end');
        });
    }
    publishMessage(topic, message) {
        this.client.publish(topic, message, (err) => {
            if (err) {
                console.error(`[Publisher] error publishing message to ${topic}`, err);
            }
            else {
                console.log(`[Publisher] published "${message}" to ${topic}`);
            }
        });
    }
}
exports.Publisher = Publisher;
const publisher = new Publisher();

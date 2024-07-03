import mqtt, { IClientOptions, MqttClient } from "mqtt";

export class Publisher {

    private client!: MqttClient;
    private username = 'username';
    private password = '7ashdl-as9d8i-89mHJ';

    constructor() {
        console.log('[Publisher] starting');
        this.startPublisher();
    }

    private startPublisher() {

        const options: IClientOptions = {
            username: this.username,
            password: this.password
        };

        this.client = mqtt.connect('mqtt://localhost:1883', options);

        this.client.on('error', (err) => {
            console.error(`[Publisher] error`, err);
        });

        this.client.on('connect', () => {
            console.log('[Publisher] connected to broker');

            setInterval(() => {
                this.publishMessage('heartbeat', `${Math.floor(Math.random()*1000)} Hello from publisher`);
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

    private publishMessage(topic: string, message: string) {
        this.client.publish(topic, message, (err) => {
            if (err) {
                console.error(`[Publisher] error publishing message to ${topic}`, err);
            } else {
                console.log(`[Publisher] published "${message}" to ${topic}`);
            }
        });
    }

}

const publisher = new Publisher();

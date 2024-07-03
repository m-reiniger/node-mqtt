import mqtt, { IClientOptions, MqttClient } from 'mqtt';

export class Subscriber {

    private client!: MqttClient;
    private username = 'username';
    private password = '7ashdl-as9d8i-89mHJ';

    constructor() {
        console.log('[Subscriber] starting');
        this.startSubscriber();
    }

    private startSubscriber() {

        const options: IClientOptions = {
            username: this.username,
            password: this.password
        };

        this.client = mqtt.connect('mqtt://localhost:1883', options);

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

    subscribeToTopic(topic: string) {
        this.client.subscribe(topic, (err) => {
            if (err) {
                console.error(`[Subscriber] error subscribing to heartbeat ${topic}`, err);
            } else {
                console.log(`[Subscriber] subscribed to top ${topic}`);
            }
        });
    }
}

const subscriber = new Subscriber();
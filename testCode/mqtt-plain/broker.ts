import Aedes from 'aedes';
import { createServer } from 'net';


const PORT = 1883;


export class MQTTBroker {
    constructor() {
        console.log('[MQTTBroker] starting');
        this.startBroker(PORT);
    }

    private startBroker(port: number) {
        const aedes = new Aedes();
        const server = createServer(aedes.handle);

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
            console.log('[MQTTBroker] client publishing', packet, client?.id);
        });

        aedes.on('ack', (packet, client) => {
            console.log('[MQTTBroker] client ack', packet, client?.id);
        });

        server.listen(port, () => {
            console.log('[MQTTBroker] started and listening on port', port);
        });
    }   

}

const broker = new MQTTBroker();


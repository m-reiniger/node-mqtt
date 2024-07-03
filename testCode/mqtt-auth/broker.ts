import Aedes, { AedesOptions } from 'aedes';
import { createServer } from 'net';


export class MQTTBroker {

    private port = 1883;
    private username = 'username';
    private password = '7ashdl-as9d8i-89mHJ';

    constructor() {
        console.log('[MQTTBroker] starting');
        this.startBroker(this.port);
    }

    private startBroker(port: number) {

        const options: AedesOptions = {
            authenticate: (client, username, password, callback) => {
                const authorized = (username === this.username && password?.toString() === this.password);
                callback(null, authorized);
            }
        };

        const aedes = new Aedes(options);
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
            console.log('[MQTTBroker] client error', client.id, err.message);
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


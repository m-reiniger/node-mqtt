export declare class Subscriber {
    private client;
    private username;
    private password;
    private key;
    private cert;
    constructor();
    private startSubscriber;
    subscribeToTopic(topic: string): void;
}

export default class ConnectionManager {
    private webSocket;
    constructor(path?: string);
    send(payload: any): void;
    on(event: "open" | "close" | "message", callback: any): void;
    close(): void;
}

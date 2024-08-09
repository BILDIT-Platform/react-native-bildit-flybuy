export default class FlipperConnectionManager {
    private baseConnectionManager;
    private flipperConnection;
    private openCallbacks;
    private closeCallbacks;
    private messageCallbacks;
    constructor(path?: string);
    handleConnect: (connection: any) => void;
    handleMessage: (data: any) => void;
    handleDisconnect: () => void;
    send(payload: any): void;
    on(event: "open" | "close" | "message", callback: any): void;
    close(): void;
}

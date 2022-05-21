// Types definitions for socket.io
export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface Message {
    from: string;
    to: string;
    payload: string;
    sent_at: Date;
    received_at?: Date; 
    type?: string;
}
/*interface SocketData {
  name: string;
  age: number;
}*/
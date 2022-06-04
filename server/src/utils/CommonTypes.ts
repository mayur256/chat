export interface ResponsePayload {
    status: number;
    error: boolean;
    data?: any;
};

// Types definitions for socket.io
export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    echoMessage: (msg: Message) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
    signIn: () => void;
    message: (message: Message) => void;
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
    _id?: string;
}
/*interface SocketData {
  name: string;
  age: number;
}*/
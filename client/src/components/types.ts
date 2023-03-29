// type for message
export interface MessageType {
    from: string;
    to: string;
    payload: string;
    sent_at: Date;
    received_at?: Date;
    type?: string;
    send?: boolean;
    _id?: string;
}
export interface GroupType {
    _id: string;
    name: string;
    members?: Array<string>;
    created_by?: string;
    avatar?: string;
    online?: boolean;
    messages?: MessageType[],
    isSelected?: boolean | undefined;
}

export interface ContactThreadType {
    _id: string;
    name: string;
    avatar: string;
    online: boolean;
    isSelected?: boolean | undefined;
}

// Generic Response schematics
export interface IResponse {
    status: number;
    error: boolean;
}

export interface IAuthUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
}

// Types definitions for socket.io
export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    echoMessage: (msg: MessageType) => void;
    isOnline: (userId: string) => void;
    'user-disconnected': (userId: string) => void;
    typingEchoed: (userId: string) => void;
}

export interface ClientToServerEvents {
    signIn: (userId: string) => void;
    message: (message: MessageType) => void;
    disconnect: () => void;
    isTyping: (userId: string) => void;
}

export type TDivRef = HTMLDivElement;

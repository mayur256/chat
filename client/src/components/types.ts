// type for message
export interface MessageType {
    from: string;
    to: string;
    payload: string;
    sent_at: Date;
    received_at?: Date;
    type?: string;
    send?: boolean
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
// type for message
export interface MessageType {
    payload: string;
    timestamp: number;
    type?: string;
    send?: boolean;
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
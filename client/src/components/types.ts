// type for message
export interface MessageType {
    payload: string;
    timestamp: number;
    type?: string;
    send?: boolean;
}
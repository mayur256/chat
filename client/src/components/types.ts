// type for message
export interface MessageType {
    payload: string;
    timestamp: number;
    type?: string;
    send?: boolean;
}

export interface ContactThreadType {
    id: string;
    name: string;
    avatarSrc: string;
    online: boolean;
    isSelected: boolean;
}
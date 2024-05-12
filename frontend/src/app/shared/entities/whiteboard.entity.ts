export interface User {
    _id: string;
    name?: string;
    email: string;
    role: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Whiteboard {
    _id: string;
    roomId: string;
    name: string;
    description?: string;
    totoDataUrl?: string;
    createdBy?: User;
}
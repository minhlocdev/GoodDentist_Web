export interface Appointment {
    id: number;
    status: string;
    location: string;
    resource: string;
    address: string;
}

export interface Blockout {
    id: number;
    name: string;
}

export interface EventItem {
    start?: Date;
    end?: Date;
    data?: { appointment?: Appointment; blockout?: Blockout };
    isDraggable?: boolean;
    resourceId?: number;
}

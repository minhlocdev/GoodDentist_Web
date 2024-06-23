export interface Appointment {
    id: number;
    status: string;
    location: string;
    resource: string;
    address: string;
}

export interface EventItem {
    start?: Date;
    end?: Date;
    data?: { appointment?: Appointment };
    isDraggable?: boolean;
    resourceId?: number;
}

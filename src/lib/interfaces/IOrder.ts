export interface IOrder {
    orderId: number;
    orderName?: string;
    examinationId?: number;
    dateTime?: Date;
    price?: number;
    status?: boolean;
}

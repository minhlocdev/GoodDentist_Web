import { IPostService } from '../services-types/IPostService';

export interface IPutOrder {
    orderId: number;
    orderName?: string;
    examinationId?: number;
    dateTime?: Date;
    price?: number;
    status?: boolean;
    services?: IPostService[];
}

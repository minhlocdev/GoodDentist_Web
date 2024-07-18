import { IPostService } from '../services-types/IPostService';

export interface IPostOrder {
    orderName?: string;
    examinationId?: number;
    dateTime?: Date;
    price?: number;
    status?: boolean;
    services?: IPostService[];
}

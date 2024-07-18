import { IExamination } from './examination-types/IExamination';

export interface EventItem {
    start?: Date;
    end?: Date;
    data?: { appointment?: IExamination };
    isDraggable?: boolean;
    resourceId?: string;
}

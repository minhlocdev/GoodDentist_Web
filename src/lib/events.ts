import { Views } from 'react-big-calendar';
import { EventItem } from './interfaces/IEvent';

export const VIEW_OPTIONS = [
    { id: Views.DAY, label: 'Day' },
    { id: Views.WEEK, label: 'Week' },
    { id: Views.MONTH, label: 'Month' }
];

export enum AppointmentStatusCode {
    Pending = 1,
    CheckedIn = 2
}

export const EVENT_STATUS_COLORS = {
    1: '#bee2fa',
    2: '#c7edca'
};

export const EVENTS: EventItem[] = [];

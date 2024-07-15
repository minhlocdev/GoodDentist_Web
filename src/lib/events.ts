import { Views } from 'react-big-calendar';
import { EventItem } from './interfaces/IEvent';

export const VIEW_OPTIONS = [
    { id: Views.DAY, label: 'Day' },
    { id: Views.WEEK, label: 'Week' },
    { id: Views.MONTH, label: 'Month' }
];
export const AppointmentStatusNames = [
    'Chưa đến',
    'Đã đến',
    'Đang điều trị',
    'Đã xong',
    'Hủy lịch hẹn',
    'Hẹn lại sau'
];

export const EVENT_STATUS_COLORS = {
    1: '#bee2fa', // Chưa đến
    2: '#c7edca', // Đã đến
    3: '#fbd38d', // Đang điều trị
    4: '#c4c4c4', // Đã xong
    5: '#f7acac', // Hủy lịch hẹn
    6: '#9cd9e5' // Hẹn lại sau
};
export const EVENTS: EventItem[] = [];

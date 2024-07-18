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

export const EVENT_STATUS_COLORS = [
    '#ffd54f', // Chưa đến (a yellow color)
    '#9ee0b0', // Đã đến (a lighter green)
    '#ffc266', // Đang điều trị (a lighter orange)
    '#a6a6a6', // Đã xong (a darker gray)
    '#f08080', // Hủy lịch hẹn (a lighter red)
    '#7cd9e5' // Hẹn lại sau (a lighter teal)
];
export const EVENTS: EventItem[] = [];

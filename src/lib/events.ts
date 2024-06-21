import { addHours, parse, startOfHour } from 'date-fns';
import { Views } from 'react-big-calendar';
import { EventItem } from './interfaces/IEvent';

export const VIEW_OPTIONS = [
    { id: Views.DAY, label: 'Day' },
    { id: Views.WEEK, label: 'Week' },
    { id: Views.MONTH, label: 'Month' }
];

export const RESOURCES = [
    {
        id: 1,
        name: 'Dr Alex',
        photo: 'https://plus.unsplash.com/premium_photo-1718204434029-d710f571cf14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 2,
        name: 'Dr John',
        photo: 'https://images.unsplash.com/photo-1718830884370-cf77049f79ed?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 3,
        name: 'Dr Jane',
        photo: 'https://plus.unsplash.com/premium_photo-1714674731181-943f49944431?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 4,
        name: 'Dr Smith',
        photo: 'https://plus.unsplash.com/premium_photo-1683134635410-7409eb4f6d44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
];

export enum AppointmentStatusCode {
    Pending = 'P',
    CheckedIn = 'CI'
}

export const EVENT_STATUS_COLORS = {
    P: '#bee2fa',
    CI: '#c7edca'
};

export const EVENTS: EventItem[] = [
    {
        start: addHours(
            startOfHour(parse('2024-06-21T10:00:00', "yyyy-MM-dd'T'HH:mm:ss", new Date())),
            0
        ),
        end: addHours(
            startOfHour(parse('2024-06-21T11:00:00', "yyyy-MM-dd'T'HH:mm:ss", new Date())),
            1
        ),
        data: {
            appointment: {
                id: 1,
                status: 'P',
                location: 'New York',
                resource: 'Dr Alex',
                address: 'Building 5\nStreet 44\nNear Express Highway\nNew York'
            }
        },
        resourceId: 1
    },
    {
        start: addHours(
            startOfHour(parse('2024-06-21T12:00:00', "yyyy-MM-dd'T'HH:mm:ss", new Date())),
            0
        ),
        end: addHours(
            startOfHour(parse('2024-06-21T13:00:00', "yyyy-MM-dd'T'HH:mm:ss", new Date())),
            1
        ),
        data: {
            appointment: {
                id: 2,
                status: 'CI',
                location: 'Washington',
                resource: 'Dr David',
                address: 'Block 1\nStreet 32\nLong Island\nNew York'
            }
        },
        resourceId: 2
    }
];

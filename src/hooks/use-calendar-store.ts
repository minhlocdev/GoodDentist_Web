import { View } from 'react-big-calendar';
import { create } from 'zustand';
import { EventItem } from '../lib/interfaces/IEvent';

interface useCalendarStoreProps {
    view: View;
    mode: 'calendar' | 'list';
    selectedDate: Date;
    selectedEvent: EventItem | null;
    setEvent: (e: EventItem | null) => void;
    setDate: (date: Date | undefined) => void;
    setView: (newView: View) => void;
    setMode: (newMode: 'calendar' | 'list') => void;
}

export const useCalendarStore = create<useCalendarStoreProps>((set) => ({
    view: 'month',
    mode: 'calendar',
    selectedDate: new Date(),
    selectedEvent: null,
    setEvent: (event) => set({ selectedEvent: event }),
    setDate: (date) => set({ selectedDate: date }),
    setView: (newView) => set({ view: newView }),
    setMode: (newMode) => set({ mode: newMode })
}));

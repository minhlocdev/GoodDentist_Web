import { View } from 'react-big-calendar';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface useCalendarStoreProps {
    view: View;
    mode: 'calendar' | 'list';
    selectedDate: Date;
    setDate: (date: Date | undefined) => void;
    setView: (newView: View) => void;
    setMode: (newMode: 'calendar' | 'list') => void;
}

export const useCalendarStore = create(
    persist<useCalendarStoreProps>(
        (set) => ({
            view: 'month',
            mode: 'calendar',
            selectedDate: new Date(),
            setDate: (date) => set({ selectedDate: date }),
            setView: (newView) => set({ view: newView }),
            setMode: (newMode) => set({ mode: newMode })
        }),
        {
            name: 'calendar',
            storage: createJSONStorage(() => localStorage)
        }
    )
);

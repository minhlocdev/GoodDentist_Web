import { SlotInfo, View } from 'react-big-calendar';
import { create } from 'zustand';
import { IExamination } from '../lib/interfaces/examination-types/IExamination';

interface useCalendarStoreProps {
    view: View;
    mode: 'calendar' | 'list';
    selectedDate: Date;
    selectedEvent: IExamination | undefined;
    dialogOpen: boolean;
    selectedSlot: SlotInfo | null;
    selectedClinicId: string | null;
    setEvent: (e: IExamination | undefined) => void;
    setDate: (date: Date | undefined) => void;
    setView: (newView: View) => void;
    setMode: (newMode: 'calendar' | 'list') => void;
    setOpenDialog: () => void;
    setSlot: (newSlot: SlotInfo) => void;
    setClinic: (newClinic: string) => void;
}

export const useCalendarStore = create<useCalendarStoreProps>((set) => ({
    view: 'month',
    mode: 'calendar',
    selectedDate: new Date(),
    selectedEvent: undefined,
    dialogOpen: false,
    selectedSlot: null,
    selectedClinicId: null,
    setEvent: (event) => set({ selectedEvent: event }),
    setDate: (date) => set({ selectedDate: date }),
    setView: (newView) => set({ view: newView }),
    setMode: (newMode) => set({ mode: newMode }),
    setOpenDialog: () => set((state) => ({ dialogOpen: !state.dialogOpen })),
    setSlot: (newSlot) => set({ selectedSlot: newSlot }),
    setClinic: (newClinic) => set({ selectedClinicId: newClinic })
}));

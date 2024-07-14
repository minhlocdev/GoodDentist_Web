import { SlotInfo, View } from 'react-big-calendar';
import { create } from 'zustand';
import { IClinic } from '../lib/interfaces/clinics-types/IClinic';
import { IExamination } from '../lib/interfaces/examination-types/IExamination';

interface useCalendarStoreProps {
    view: View;
    mode: 'calendar' | 'list';
    selectedDate: Date;
    selectedEvent: IExamination | null;
    dialogOpen: boolean;
    selectedSlot: SlotInfo | null;
    selectedClinicId: string | null;
    setEvent: (e: IExamination | null) => void;
    setDate: (date: Date | undefined) => void;
    setView: (newView: View) => void;
    setMode: (newMode: 'calendar' | 'list') => void;
    setOpenDialog: () => void;
    setSlot: (newSlot: SlotInfo) => void;
    setClinic: (newClinic: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const clinic: IClinic[] =
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('clinic') ?? '{}') : null;
export const useCalendarStore = create<useCalendarStoreProps>((set) => ({
    view: 'month',
    mode: 'calendar',
    selectedDate: new Date(),
    selectedEvent: null,
    dialogOpen: false,
    selectedSlot: null,
    selectedClinicId: clinic[0].clinicId,
    setEvent: (event) => set({ selectedEvent: event }),
    setDate: (date) => set({ selectedDate: date }),
    setView: (newView) => set({ view: newView }),
    setMode: (newMode) => set({ mode: newMode }),
    setOpenDialog: () => set((state) => ({ dialogOpen: !state.dialogOpen })),
    setSlot: (newSlot) => set({ selectedSlot: newSlot }),
    setClinic: (newClinic) => set({ selectedClinicId: newClinic })
}));

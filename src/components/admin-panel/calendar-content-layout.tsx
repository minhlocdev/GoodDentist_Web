import { useStore } from 'zustand';
import { useCalendarStore } from '../../hooks/use-calendar-store';
import { CalendarNavbar } from './calendar-nav';

interface ContentLayoutProps {
    title: string;
    children: React.ReactNode;
}

export function CalendarContentLayout({ children }: ContentLayoutProps) {
    const calendar = useStore(useCalendarStore, (state) => state);

    if (!calendar) return null;
    return (
        <div>
            <CalendarNavbar />
            <div>{children}</div>
        </div>
    );
}

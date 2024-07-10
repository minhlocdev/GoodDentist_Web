import { CalendarNavbar } from './calendar-nav';

interface ContentLayoutProps {
    title: string;
    children: React.ReactNode;
}

export function CalendarContentLayout({ children }: ContentLayoutProps) {
    return (
        <div>
            <CalendarNavbar />
            <div>{children}</div>
        </div>
    );
}

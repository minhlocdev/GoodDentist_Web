import { useCalendarStore } from '../../hooks/use-calendar-store';
import { examinationService } from '../../services/queries/examinationQuery';
import BackdropLoader from '../ui/local/backdrop-loader';
import { CalendarNavbar } from './calendar-nav';

interface ContentLayoutProps {
    title: string;
    children: React.ReactNode;
}

export function CalendarContentLayout({ children }: ContentLayoutProps) {
    const { selectedClinicId } = useCalendarStore();
    const { isLoading } = examinationService.GetExaminationByClinic(selectedClinicId ?? '', 1, 200);
    if (isLoading) {
        return <BackdropLoader />;
    }
    return (
        <div>
            <CalendarNavbar />
            <div>{children}</div>
        </div>
    );
}

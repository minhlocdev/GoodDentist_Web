import { Navbar } from '../../../components/admin-panel/navbar';

interface AppointmentLayoutProps {
    title: string;
    children: React.ReactNode;
}

export function AppointmentLayout({ title, children }: AppointmentLayoutProps) {
    return (
        <div>
            <Navbar title={title} />
            <div className="w-full">{children}</div>
        </div>
    );
}

export default AppointmentLayout;

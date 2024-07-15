import { Tabs } from '../../tab';
import { ExaminationProfileNavbar } from '../examination-profile-nav';

interface ExaminationProfileLayoutProps {
    title: string;
    children: React.ReactNode;
}
const ExaminationProfileLayout = ({ title, children }: ExaminationProfileLayoutProps) => {
    return (
        <Tabs defaultValue="basicinfo">
            <ExaminationProfileNavbar title={title} />
            <div className="container pb-6 pt-6">{children}</div>
        </Tabs>
    );
};

export default ExaminationProfileLayout;

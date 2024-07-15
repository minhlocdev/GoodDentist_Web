import { Button } from '../../../components/ui/button';
import { IExaminationProfile } from '../../../lib/interfaces/others/IExaminationProfile';
import AppointmentModal from '../appoinment/appointment-modal';

interface ExaminationsProps {
    examProfiles?: IExaminationProfile[];
}

const Examinations = ({ examProfiles }: ExaminationsProps) => {
    console.log(examProfiles);
    return (
        <div className="mb-2 flex w-full items-center justify-between">
            <h1 className="text-lg font-semibold">Lịch hẹn</h1>
            <Button asChild>
                <AppointmentModal />
            </Button>
        </div>
    );
};

export default Examinations;

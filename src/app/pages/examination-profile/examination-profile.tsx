import { useParams } from 'react-router-dom';
import ExaminationProfileLayout from '../../../components/ui/local/layouts/examination-profile-layout';
import { TabsContent } from '../../../components/ui/tab';
import { examinationService } from '../../../services/queries/examinationQuery';
import Examinations from './examinations';
import MedicalRecordProfile from './medical-record-profile';
import MedicineProfile from './medicine-profile';
import PaymentProfile from './payment-profile';
import TreatmentProfile from './treatment-profile';
import UserProfile from './user-profile';

const ExaminationProfile = () => {
    const { code } = useParams();
    const { data: examProfiles, isLoading } = examinationService.GetExaminationProfileByCustomer(
        code! ?? ''
    );
    if (isLoading) {
        return <div>...Loading</div>;
    }
    return (
        <ExaminationProfileLayout title={examProfiles?.[0].customer?.name ?? ''}>
            <div className="w-full">
                <TabsContent value="basicinfo">
                    <UserProfile customer={examProfiles?.[0].customer} />
                </TabsContent>
                <TabsContent value="treatment">
                    <TreatmentProfile examProfiles={examProfiles} />
                </TabsContent>
                <TabsContent value="medicine">
                    <MedicineProfile />
                </TabsContent>
                <TabsContent value="medical-record">
                    <MedicalRecordProfile />
                </TabsContent>
                <TabsContent value="examination">
                    <Examinations examProfiles={examProfiles} />
                </TabsContent>
                <TabsContent value="payment">
                    <PaymentProfile />
                </TabsContent>
            </div>
        </ExaminationProfileLayout>
    );
};

export default ExaminationProfile;

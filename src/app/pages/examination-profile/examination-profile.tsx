import ExaminationProfileLayout from '../../../components/ui/local/layouts/examination-profile-layout';
import { TabsContent } from '../../../components/ui/tab';
import Examinations from './examinations';
import MedicalRecordProfile from './medical-record-profile';
import MedicineProfile from './medicine-profile';
import PaymentProfile from './payment-profile';
import TreatmentProfile from './treatment-profile';
import UserProfile from './user-profile';

const ExaminationProfile = () => {
    return (
        <ExaminationProfileLayout title="Mary Jane">
            <div className="w-full">
                <TabsContent value="basicinfo">
                    <UserProfile />
                </TabsContent>
                <TabsContent value="treatment">
                    <TreatmentProfile />
                </TabsContent>
                <TabsContent value="medicine">
                    <MedicineProfile />
                </TabsContent>
                <TabsContent value="medical-record">
                    <MedicalRecordProfile />
                </TabsContent>
                <TabsContent value="examination">
                    <Examinations />
                </TabsContent>
                <TabsContent value="payment">
                    <PaymentProfile />
                </TabsContent>
            </div>
        </ExaminationProfileLayout>
    );
};

export default ExaminationProfile;

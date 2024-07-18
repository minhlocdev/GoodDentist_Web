import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ExaminationProfileLayout from '../../../components/ui/local/layouts/examination-profile-layout';
import { TabsContent } from '../../../components/ui/tab';
import { useExaminationStore } from '../../../hooks/use-examination-store';
import { examinationService } from '../../../services/queries/examinationQuery';
import Examinations from './examinations';
import MedicalRecordProfile from './medical-record-profile';
import MedicineProfile from './medicine-profile';
import PaymentProfile from './payment-profile';
import TreatmentProfile from './treatment-profile';
import UserProfile from './user-profile';

const ExaminationProfile = () => {
    const { code } = useParams();
    const { setExamProfilesData, setOrders } = useExaminationStore();
    const {
        data: examProfiles,
        isLoading,
        isSuccess
    } = examinationService.GetExaminationProfileByCustomer(code ?? '');
    useEffect(() => {
        if (!isLoading && isSuccess && examProfiles) {
            setExamProfilesData(examProfiles);
            const orders = examProfiles.flatMap(
                (profile) => profile.examinations?.flatMap((exam) => exam.orders ?? []) ?? []
            );
            setOrders(orders);
        }
    }, [isLoading, isSuccess, examProfiles, setExamProfilesData, setOrders]);

    if (isLoading) {
        return (
            <ExaminationProfileLayout title=" ">
                <div className="flex h-[50vh] w-full items-center justify-center">
                    <LoaderCircle className="animate-spin" />
                </div>
            </ExaminationProfileLayout>
        );
    }

    return (
        <ExaminationProfileLayout title={examProfiles?.[0]?.customer?.name ?? ''}>
            <div className="w-full">
                <TabsContent value="basicinfo">
                    <UserProfile customer={examProfiles?.[0]?.customer} />
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

import { ContentLayout } from '../../../components/ui/local/layouts/content-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tab';

const ExaminationProfile = () => {
    return (
        <ContentLayout title="Mary Jane">
            <div className="w-full">
                <Tabs defaultValue="account">
                    <TabsList>
                        <TabsTrigger value="basicinfo">Thông tin khách hàng</TabsTrigger>
                        <TabsTrigger value="treatment">Khám và điều trị</TabsTrigger>
                        <TabsTrigger value="medicine">Đơn thuốc</TabsTrigger>
                        <TabsTrigger value="medical-record">Thư viện ảnh</TabsTrigger>
                        <TabsTrigger value="examination">Lịch hẹn</TabsTrigger>
                        <TabsTrigger value="payment">Thanh toán</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basicinfo">Thông tin khách hàng</TabsContent>
                    <TabsContent value="treatment">Khám và điều trị</TabsContent>
                    <TabsContent value="medicine">Đơn thuốc</TabsContent>
                    <TabsContent value="medical-record">Thư viện ảnh</TabsContent>
                    <TabsContent value="examination">Lịch hẹn</TabsContent>
                    <TabsContent value="payment">Thanh toán</TabsContent>
                </Tabs>
            </div>
        </ContentLayout>
    );
};

export default ExaminationProfile;

import { ContentLayout } from '../../../components/admin-panel/content-layout';
import { servicesService } from '../../../services/queries/serviceQuery';

const ServicePage = () => {
    const { data: services } = servicesService.GetServices(1, 10);
    console.log(services);
    return (
        <ContentLayout title="Quản lý thủ thuật">
            <h1 className="text-secondary-foreground">Hello Service</h1>
        </ContentLayout>
    );
};

export default ServicePage;

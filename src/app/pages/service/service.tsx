import { ContentLayout } from '../../../components/ui/local/layouts/content-layout';
import { ServiceDataTable } from './service-data-table';

const ServicePage = () => {
    return (
        <ContentLayout title="Quản lý thủ thuật">
            <div className="rounded-md border border-neutral-200 bg-white p-4">
                <ServiceDataTable />
            </div>
        </ContentLayout>
    );
};

export default ServicePage;

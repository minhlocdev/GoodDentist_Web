import { Button } from '../../../components/ui/button';
import { CustomerModal } from '../customer/customer-modal';

const UserProfile = () => {
    return (
        <div className="w-full rounded-sm border border-neutral-200 bg-white px-5 py-8">
            <div className="flex w-full items-center justify-between mb-2">
                <h1 className="text-lg font-semibold">Thông tin cơ bản</h1>
                <Button asChild>
                    <CustomerModal />
                </Button>
            </div>
        </div>
    );
};

export default UserProfile;

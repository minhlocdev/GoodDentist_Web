import { Button } from '../../../components/ui/button';
import { ICustomer } from '../../../lib/interfaces/customer-types/ICustomer';
import { CustomerModal } from '../customer/customer-modal';
interface UserProfileProps {
    customer?: ICustomer;
}
const UserProfile = ({ customer }: UserProfileProps) => {
    return (
        <div className="flex flex-col gap-y-3 rounded-sm border border-neutral-300 bg-white p-6 ">
            <div className="mb-2 flex w-full items-center justify-between ">
                <h1 className="text-lg font-semibold">Thông tin cơ bản</h1>
                <Button asChild>
                    <CustomerModal customer={customer} />
                </Button>
            </div>
            <div className="grid w-full grid-cols-12 gap-x-4">
                <div className="col-span-3 h-52 max-h-52 w-full max-w-64 border border-neutral-300">
                    <img alt="image" src={customer?.avatar as string} />
                </div>
                <div className="col-span-4 grid grid-flow-row-dense grid-cols-2 ">
                    <div>Họ và tên</div>
                    <div>{customer?.name}</div>
                </div>
                <div className="col-span-5 grid grid-cols-2">
                    <div className="col-span-1">Tiền sử bệnh</div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

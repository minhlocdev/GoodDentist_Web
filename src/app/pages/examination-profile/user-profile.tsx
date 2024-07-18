import { format } from 'date-fns';
import { ICustomer } from '../../../lib/interfaces/customer-types/ICustomer';
import { CustomerModal } from '../customer/customer-modal';
interface UserProfileProps {
    customer?: ICustomer;
}
const UserProfile = ({ customer }: UserProfileProps) => {
    function isValidUrl(url: string | undefined): boolean {
        if (!url) return false;
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }

    return (
        <div className="flex flex-col gap-y-3 rounded-sm border border-neutral-300 bg-white p-6 ">
            <div className="mb-2 flex w-full items-center justify-between ">
                <h1 className="text-lg font-semibold">Thông tin cơ bản</h1>
                <CustomerModal customer={customer} />
            </div>
            <div className="grid w-full grid-cols-1 gap-x-4 md:grid-cols-12">
                <div className="col-span-1 h-52 max-h-60 max-w-64 border border-neutral-300 md:col-span-3 md:flex md:items-center md:justify-center">
                    {isValidUrl(customer?.avatar as string) ? (
                        <img alt="avatar" src={customer?.avatar as string} />
                    ) : (
                        <img
                            alt="avatar"
                            src="/avatardefault_92824.webp"
                            className="h-full w-full"
                        />
                    )}
                </div>
                <div className="col-span-1 grid grid-flow-row-dense grid-cols-2 gap-y-3 md:col-span-4">
                    <div className="font-bold text-neutral-800">Mã khách hàng</div>
                    <div className="text-neutral-300">{customer?.userId}</div>
                    <div className="font-bold text-neutral-800">Ngày tạo</div>
                    <div>{format(customer?.createdDate ?? new Date(), 'dd-MM-yyyy')}</div>
                    <div className="font-bold text-neutral-800">Giới tính</div>
                    <div>{customer?.gender}</div>
                    <div className="font-bold text-neutral-800">Email</div>
                    <div>{customer?.email}</div>
                    <div className="font-bold text-neutral-800">Ngày sinh</div>
                    <div>{format(customer?.dob ?? new Date(), 'dd-MM-yyyy')}</div>
                    <div className="font-bold text-neutral-800">Số điện thoại</div>
                    <div>{customer?.phoneNumber}</div>
                    <div className="font-bold text-neutral-800">Địa chỉ</div>
                    <div>{customer?.address}</div>
                    <div className="col-span-2 flex flex-col gap-y-3">
                        <span className="text-xs text-neutral-500">GHI CHÚ</span>
                        <div className="flex min-h-24 flex-1 rounded-sm border border-neutral-300 p-3"></div>
                    </div>
                </div>
                <div className="col-span-1 grid grid-cols-2 md:col-span-4 md:col-start-9">
                    <div className="col-span-2 flex flex-col gap-y-3">
                        <span className="text-xs text-neutral-500">TIỀN SỬ BỆNH</span>
                        <div className="flex max-w-full flex-wrap">{customer?.anamnesis}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

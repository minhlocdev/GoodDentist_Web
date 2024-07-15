import { ReceiptEuro } from 'lucide-react';
import { Button } from '../../../components/ui/button';

const PaymentProfile = () => {
    return (
        <div className="mb-2 flex w-full items-center justify-between">
            <h1 className="text-lg font-semibold">Thông tin thanh toán</h1>
            <Button className="flex gap-x-2">
                <ReceiptEuro />
                Thanh toán
            </Button>
        </div>
    );
};

export default PaymentProfile;

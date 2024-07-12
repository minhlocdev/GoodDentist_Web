import { Button } from '../../../components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '../../../components/ui/dialog';

interface CorfirmQuittingProps {
    open: boolean;
    setConfirm: () => void;
    setOpen: () => void;
}
const ConfirmQuitting = ({ open, setOpen, setConfirm }: CorfirmQuittingProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>THÔNG BÁO XÁC NHẬN</DialogTitle>
                </DialogHeader>
                <div className="m-6 flex items-end justify-start text-center align-middle text-xl">
                    Nhân sự sẽ dừng làm việc tại phòng khám. Tuy nhiên, các thông tin dữ liệu tồn
                    tại sẽ không bị xóa
                </div>
                <DialogFooter className="flex flex-row justify-between border-t border-neutral-300 p-5">
                    <Button
                        onClick={() => {
                            setConfirm();
                            setOpen();
                        }}
                        className="flex-1"
                    >
                        Xác nhận
                    </Button>
                    <DialogClose asChild>
                        <Button variant="secondary" className="flex-1">
                            Hủy bỏ
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmQuitting;

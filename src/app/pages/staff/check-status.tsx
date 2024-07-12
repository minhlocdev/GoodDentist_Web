import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Checkbox } from '../../../components/ui/checkbox';
import { IPostUser } from '../../../lib/interfaces/user-types/IPostUser';
import { IUser } from '../../../lib/interfaces/user-types/IUser';
import { queryClient } from '../../../lib/queryClient';
import { userService } from '../../../services/queries/userQuery';
import ConfirmQuitting from './confirm-quitting';
import JobReturnForm from './job-return';

interface CheckStatusProps {
    user: IUser;
}

export const CheckStatus: React.FC<CheckStatusProps> = ({ user }) => {
    const { mutate: putUser, isPending } = userService.PutUser();
    const [isJobTransferOpen, setIsJobTransferOpen] = useState(false);
    const [isQuitting, setIsQuitting] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const updatedUser: IPostUser = {
        ...user,
        clinicId: user?.clinics?.[0]?.clinicId ?? '',
        status: true
    };
    useEffect(() => {
        if (confirm) {
            updatedUser.status = false;
            putUser(updatedUser, {
                onSuccess: async (res) => {
                    if (res.isSuccess) {
                        toast.success('Cập nhật thành công');
                        await queryClient.refetchQueries({ queryKey: ['users'] });
                    } else {
                        toast.error(res.message);
                    }
                    setConfirm(false);
                },
                onError: (error) => {
                    toast.error('Cập nhật thất bại');
                    console.error('Failed to update status:', error);
                    setConfirm(false);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirm]);
    const handleStatusChange = (value: boolean) => {
        if (value) {
            setIsJobTransferOpen(true);
        } else {
            setIsQuitting(true);
        }
    };

    return (
        <div className="w-full text-center">
            {isPending ? (
                <LoaderCircle className="h-3 w-3 animate-spin" />
            ) : (
                <>
                    <Checkbox
                        checked={user.status}
                        onCheckedChange={(value) => handleStatusChange(!!value)}
                        aria-label="Select row"
                    />
                    <JobReturnForm
                        user={updatedUser}
                        open={isJobTransferOpen}
                        setOpen={() => setIsJobTransferOpen(false)}
                    />
                    <ConfirmQuitting
                        open={isQuitting}
                        setOpen={() => setIsQuitting(false)}
                        setConfirm={() => setConfirm(true)}
                    />
                </>
            )}
        </div>
    );
};

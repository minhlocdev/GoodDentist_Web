import { CaretSortIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Button } from '../../../components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '../../../components/ui/tooltip';
import { IClinic } from '../../../lib/interfaces/clinics-types/IClinic';
import { IPostUser } from '../../../lib/interfaces/user-types/IPostUser';
import { IUser } from '../../../lib/interfaces/user-types/IUser';
import { CheckStatus } from './check-status';
import { EditStaffModal } from './edit-staff-modal';
import JobTranferForm from './job-tranfer-form';

export const columns: ColumnDef<IUser>[] = [
    {
        accessorKey: 'status',
        header: () => <div className="w-full text-center">Đang làm việc</div>,
        cell: ({ row }) => {
            const user = row.original;
            return <CheckStatus user={user} />;
        }
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Họ tên
                    <CaretSortIcon className="h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue('name')}</div>
    },
    {
        accessorKey: 'userName',
        header: ({ column }) => {
            return (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Tài khoản
                    <CaretSortIcon className="h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue('userName')}</div>
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Email
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>
    },
    {
        header: ({ column }) => {
            return (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Ngày sinh
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        accessorKey: 'dob',
        cell: ({ row }) => <div>{format(row.getValue('dob'), 'dd/MM/y')}</div>
    },
    {
        header: ({ column }) => {
            return (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Vai trò
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        accessorKey: 'roleId',
        cell: ({ row }) => (
            <div>
                {row.getValue('roleId') === 1
                    ? 'Admin'
                    : row.getValue('roleId') === 2
                      ? 'Bác sỹ'
                      : 'Nhân viên'}
            </div>
        )
    },
    {
        header: ({ column }) => {
            return (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Giới tính
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        accessorKey: 'gender',
        cell: ({ row }) => <div className="capitalize">{row.getValue('gender')}</div>
    },
    {
        header: ({ column }) => {
            return (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Số điện thoại
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        accessorKey: 'phoneNumber',
        cell: ({ row }) => <div className="capitalize">{row.getValue('phoneNumber')}</div>
    },
    {
        header: ({ column }) => {
            return (
                <Button
                    className="px-1"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Địa chỉ
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        accessorKey: 'address',
        cell: ({ row }) => <div className="capitalize">{row.getValue('address')}</div>
    },
    {
        header: 'Cơ sở',
        accessorKey: 'clinics',
        cell: ({ row }) => {
            const clinics = row.getValue<IClinic[]>('clinics');
            return (
                <div className="capitalize">
                    {clinics && clinics.length > 0 ? clinics[0].clinicName : 'N/A'}
                </div>
            );
        }
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original;
            const updatedUser: IPostUser = {
                ...user,
                clinicId: user?.clinics?.[0]?.clinicId ?? "",
                status: true
            };
            if (user?.clinics?.length !== 0) {
                return (
                    <div className="flex gap-x-1">
                        <TooltipProvider>
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger className="w-full">
                                    <EditStaffModal staff={user} />
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Chỉnh sửa</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger className="w-full">
                                    <JobTranferForm user={updatedUser} />
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Chuyển công tác</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                );
            }

            return null;
        }
    }
];

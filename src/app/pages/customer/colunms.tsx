import { CaretSortIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '../../../components/ui/tooltip';
import { IClinic } from '../../../lib/interfaces/clinics-types/IClinic';
import { ICustomer } from '../../../lib/interfaces/customer-types/ICustomer';
import { queryClient } from '../../../lib/queryClient';
import { customerService } from '../../../services/queries/customerQuery';
import { CustomerModal } from './customer-modal';

export const columns: ColumnDef<ICustomer>[] = [
    {
        header: ({ column }) => {
            return (
                <Button
                    className="flex w-full items-center"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Mã hồ sơ
                    <CaretSortIcon className="h-4 w-4" />
                </Button>
            );
        },
        accessorKey: 'examinationProfiles',
        cell: ({ row }) => {
            const customer: ICustomer = row.original;
            const examinationProfiles: number[] = row.getValue('examinationProfiles');
            return (
                <div className="flex w-full flex-col items-center justify-center gap-y-1 text-center">
                    {examinationProfiles.map((profileId, index) => (
                        <Button variant={'link'} key={index} className="text-sm">
                            <a href={`/examination-profile/${customer.userId}`}>{profileId}</a>
                        </Button>
                    ))}
                </div>
            );
        }
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Họ tên
                    <CaretSortIcon className="h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue('name')}</div>
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
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
        header: 'Ngày sinh',
        accessorFn: (user) => (user.dob ? format(user.dob, 'dd/MM/y') : '')
    },
    {
        header: 'Giới tính',
        accessorKey: 'gender',
        cell: ({ row }) => <div className="capitalize">{row.getValue('gender')}</div>
    },
    {
        header: 'Số điện thoại',
        accessorKey: 'phoneNumber',
        cell: ({ row }) => <div className="capitalize">{row.getValue('phoneNumber')}</div>
    },
    {
        header: 'Địa chỉ',
        accessorKey: 'address',
        cell: ({ row }) => (
            <div className="max-w-[200px] truncate capitalize" title={row.getValue('address')}>
                {row.getValue('address')}
            </div>
        )
    },
    {
        accessorKey: 'anamnesis',
        header: 'Tiền sử bệnh',
        cell: ({ row }) => <div className="lowercase">{row.getValue('anamnesis')}</div>
    },
    {
        accessorKey: 'createdDate',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Ngày tạo
                    <CaretSortIcon className="h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{format(row.getValue('createdDate'), 'dd-MM-yyyy')}</div>
        )
    },
    {
        header: 'Phòng khám',
        accessorKey: 'clinics',
        cell: ({ row }) => {
            const clinics: IClinic[] = row.getValue('clinics');
            return (
                <div className="max-w-[200px] truncate capitalize">{clinics?.[0].clinicName}</div>
            );
        }
    },
    {
        header: 'Thao tác',
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const customer: ICustomer = row.original;
            const deleteCustomer = customerService.DeleteCustomer();
            const handleDelete = async () => {
                await deleteCustomer.mutateAsync(customer.userId, {
                    onSuccess: async () => {
                        toast.success('Xóa thành công');
                        await queryClient.invalidateQueries({ queryKey: ['customers'] });
                    },
                    onError: (error) => {
                        if (
                            error instanceof AxiosError &&
                            error.response?.data?.statusCode === 400
                        ) {
                            toast.error(error.response.data.message[0] as React.ReactNode);
                        } else {
                            toast.error('Xóa thất bại');
                        }
                    }
                });
            };
            return (
                <div className="flex h-full w-full items-center justify-center gap-x-3">
                    <TooltipProvider>
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger className="z-10 w-full">
                                <div className="flex flex-row items-center">
                                    <CustomerModal customer={customer} />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>Chỉnh sửa</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger className="z-10 w-full">
                                <div className="flex flex-row items-center">
                                    <Trash
                                        className="h-5 w-5 text-destructive"
                                        onClick={handleDelete}
                                    />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="!bg-destructive">
                                <p>Xóa</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            );
        }
    }
];

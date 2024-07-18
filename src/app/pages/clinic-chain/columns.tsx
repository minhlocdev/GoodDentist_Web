import { CaretSortIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { AxiosError } from 'axios';
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
import { queryClient } from '../../../lib/queryClient';
import { clinicService } from '../../../services/queries/clinicQuery';
import { ClinicModal } from './clinic-modal';

export const columns: ColumnDef<IClinic>[] = [
    {
        accessorKey: 'clinicName',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Tên phòng khám
                    <CaretSortIcon className="h-4 w-4" />
                </Button>
            );
        }
    },
    {
        accessorKey: 'address',
        header: 'Địa chỉ'
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Số điện thoại',
        cell: ({ row }) => <div className="capitalize">{row.getValue('phoneNumber')}</div>
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
        accessorKey: 'status',
        header: 'Trạng thái'
    },
    {
        header: 'Thao tác',
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const clinic: IClinic = row.original;
            const deleteClinic = clinicService.DeleteClinic();
            const handleDelete = async () => {
                await deleteClinic.mutateAsync(clinic.clinicId, {
                    onSuccess: async () => {
                        toast.success('Xóa thành công');
                        await queryClient.invalidateQueries({ queryKey: ['clinics'] });
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
                                    <ClinicModal clinic={clinic} />
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

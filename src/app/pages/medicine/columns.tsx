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
import { IMedicine } from '../../../lib/interfaces/IMedicine';
import { queryClient } from '../../../lib/queryClient';
import { medicineService } from '../../../services/queries/medicineQuery';
import { MedicineModal } from './medicine-modal';

export const columns: ColumnDef<IMedicine>[] = [
    {
        accessorKey: 'medicineName',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Tên thuốc
                    <CaretSortIcon className="h-4 w-4" />
                </Button>
            );
        }
    },
    {
        accessorKey: 'type',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Loại thuốc
                    <CaretSortIcon className="h-4 w-4" />
                </Button>
            );
        }
    },
    {
        accessorKey: 'unit',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Đơn vị
                    <CaretSortIcon className="h-4 w-4" />
                </Button>
            );
        }
    },
    {
        accessorKey: 'price',
        header: 'Giá'
    },
    {
        accessorKey: 'description',
        header: 'Mô tả',
        cell: ({ row }) => (
            <div className="max-w-[200px] truncate capitalize" title={row.getValue('description')}>
                {row.getValue('description')}
            </div>
        )
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
            const medicine: IMedicine = row.original;
            const deleteMedicine = medicineService.DeleteMedicine();
            const handleDelete = async () => {
                await deleteMedicine.mutateAsync(medicine.medicineId, {
                    onSuccess: async () => {
                        toast.success('Xóa thành công');
                        await queryClient.invalidateQueries({ queryKey: ['medicines'] });
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
                                    <MedicineModal medicine={medicine} />
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

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
import { IService } from '../../../lib/interfaces/services-types/IService';
import { queryClient } from '../../../lib/queryClient';
import { serviceService } from '../../../services/queries/serviceQuery';
import { ServiceModal } from './service-modal';

export const columns: ColumnDef<IService>[] = [
    {
        accessorKey: 'serviceName',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Tên dịch vụ
                    <CaretSortIcon className="h-4 w-4" />
                </Button>
            );
        }
    },
    {
        accessorKey: 'description',
        header: 'Mô tả'
    },
    {
        accessorKey: 'price',
        header: 'Giá',
        cell: ({ row }) => <div className="lowercase">{row.getValue('price')}</div>
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
            const service: IService = row.original;
            const deleteService = serviceService.DeleteService();
            const handleDelete = async () => {
                await deleteService.mutateAsync(service.serviceId, {
                    onSuccess: async () => {
                        toast.success('Xóa thành công');
                        await queryClient.invalidateQueries({ queryKey: ['services'] });
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
                                    <ServiceModal service={service} />
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

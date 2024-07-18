import { ColumnDef } from '@tanstack/react-table';
import { Trash } from 'lucide-react';
import { Checkbox } from '../../../components/ui/checkbox';
import { Input } from '../../../components/ui/input';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '../../../components/ui/tooltip';
import { IPrescription } from '../../../lib/interfaces/IPrescription';
import { IOrderService } from '../../../lib/interfaces/others/IOrderService';
import { IService } from '../../../lib/interfaces/services-types/IService';

export const columnsService: ColumnDef<IService>[] = [
    {
        id: 'select-col',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllRowsSelected()}
                onClick={table.getToggleAllPageRowsSelectedHandler()}
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onClick={row.getToggleSelectedHandler()}
            />
        )
    },
    {
        accessorKey: 'serviceId',
        header: 'Mã dịch vụ'
    },
    {
        accessorKey: 'serviceName',
        header: 'Tên dịch vụ'
    },
    {
        accessorKey: 'price',
        header: 'Đơn giá'
    },
    {
        accessorKey: 'description',
        header: 'Nội dung khám'
    }
];

interface HandleQuantityChangeProps {
    id: number;
    value: number;
}
export const createColumnsOrderService = (
    handleQuantityChange: (props: HandleQuantityChangeProps) => void
): ColumnDef<IOrderService>[] => [
    {
        accessorKey: 'service.serviceId',
        header: 'Mã dịch vụ'
    },
    {
        accessorKey: 'service.serviceName',
        header: 'Tên dịch vụ'
    },
    {
        accessorKey: 'price',
        header: 'Đơn giá'
    },
    {
        accessorKey: 'quantity',
        header: 'Số lượng',
        cell: ({ row }) => {
            const orderService = row.original;
            return (
                <Input
                    type="number"
                    value={orderService.quantity}
                    onChange={(e) =>
                        handleQuantityChange({
                            id: orderService.orderServiceId,
                            value: Number(e.target.value)
                        })
                    }
                    className="rounded border px-2 py-1"
                />
            );
        }
    },
    {
        accessorKey: 'service.description',
        header: 'Nội dung khám'
    },
    {
        id: 'actions',
        header: 'Thao tác',
        cell: () => {
            return (
                <div className="flex gap-x-1">
                    <TooltipProvider>
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger className="w-full">
                                <Trash />
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>Bỏ chọn</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            );
        }
    }
];

export const columnsMedicine: ColumnDef<IPrescription>[] = [
    {
        id: 'stt',
        header: 'STT',
        cell: ({ row }) => {
            return row.index;
        }
    },
    {
        accessorKey: 'serviceId',
        header: 'Mã dịch vụ'
    },
    {
        accessorKey: 'serviceName',
        header: 'Tên dịch vụ'
    },
    {
        accessorKey: 'price',
        header: 'Đơn giá'
    },
    {
        accessorKey: 'description',
        header: 'Nội dung khám'
    }
];

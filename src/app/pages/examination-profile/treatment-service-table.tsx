import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    PaginationState,
    RowSelectionState,
    useReactTable
} from '@tanstack/react-table';
import React, { useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { DialogClose, DialogFooter } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { ScrollArea } from '../../../components/ui/scroll-area';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../../../components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../../../components/ui/table';
import { useExaminationStore } from '../../../hooks/use-examination-store';
import { cn } from '../../../lib/utils';
import { serviceService } from '../../../services/queries/serviceQuery';
import { columnsService } from './columns';

interface TreatmentServiceTableProps {
    onDialogClose: () => void;
}

const TreatmentServiceTable: React.FC<TreatmentServiceTableProps> = ({ onDialogClose }) => {
    const { selectedOrder, selectedServices, setSelectedServices, allServices, setAllServices } =
        useExaminationStore();
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5
    });
    const { data: servicesData } = serviceService.GetServices(1, 200);
    const initialRowSelection = React.useMemo<RowSelectionState>(() => {
        const selection: RowSelectionState = {};
        servicesData?.forEach((service, index) => {
            const serviceInOrders = selectedOrder?.orderServices?.some(
                (orderService) =>
                    (orderService.serviceId === service.serviceId && orderService.status === 1) ||
                    selectedServices?.some((selected) => selected.serviceId === service.serviceId)
            );
            if (serviceInOrders) {
                selection[index] = true;
            }
        });
        return selection;
    }, [selectedOrder?.orderServices, selectedServices, servicesData]);

    useEffect(() => {
        setRowSelection(initialRowSelection);
    }, [initialRowSelection]);

    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(initialRowSelection);
    const defaultData = React.useMemo(() => [], []);

    const table = useReactTable({
        data: servicesData ?? defaultData,
        columns: columnsService,
        enableMultiRowSelection: true,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,
        debugTable: true,
        manualFiltering: true,
        state: {
            columnFilters,
            rowSelection,
            pagination
        }
    });

    const handleSave = React.useCallback(() => {
        const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
        setSelectedServices(
            selectedRows.filter(
                (row) => !allServices?.some((service) => service.serviceId === row.serviceId)
            )
        );
        const newServices = [
            ...(allServices ?? []),
            ...selectedRows.filter(
                (row) => !allServices?.some((service) => service.serviceId === row.serviceId)
            )
        ];
        setAllServices(newServices);
        onDialogClose();
    }, [table, setSelectedServices, setAllServices, allServices, onDialogClose]);

    return (
        <div className="flex flex-col items-center gap-x-3">
            <div className="flex w-full flex-1 flex-col items-end gap-y-3 pb-4">
                <Input
                    placeholder="Tìm tên dịch vụ"
                    value={(table.getColumn('serviceName')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('serviceName')?.setFilterValue(event.target.value)
                    }
                    className="w-full flex-1 py-3"
                />
                <div className="w-full flex-1 rounded-md border">
                    <ScrollArea className="h-64 max-h-64">
                        <Table>
                            <TableHeader className="sticky bg-neutral-600/90">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id} className=" text-white">
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column.columnDef.header,
                                                              header.getContext()
                                                          )}
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && 'selected'}
                                            className={cn(row.getIsSelected() && 'selected')}
                                            onClick={row.getToggleSelectedHandler()}
                                        >
                                            {row.getVisibleCells().map((cell) => {
                                                return (
                                                    <TableCell
                                                        key={cell.id}
                                                        className="max-w-full truncate"
                                                    >
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columnsService.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                    <Select
                        value={table.getState().pagination.pageSize.toString()}
                        onValueChange={(value: string) => {
                            table.setPageSize(Number.parseInt(value) ?? 5);
                        }}
                    >
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="hàng" />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={pageSize.toString()}>
                                    {pageSize} hàng
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <DialogFooter className="flex w-full flex-row justify-between border-t border-neutral-300 p-5">
                <Button type="submit" className="flex-1" onClick={() => handleSave()}>
                    Lưu thông tin
                </Button>
                <DialogClose className="flex-1">
                    <Button
                        variant={'secondary'}
                        className="w-full hover:bg-neutral-200"
                        onClick={() => onDialogClose()}
                    >
                        Hủy bỏ
                    </Button>
                </DialogClose>
            </DialogFooter>
        </div>
    );
};

export default TreatmentServiceTable;

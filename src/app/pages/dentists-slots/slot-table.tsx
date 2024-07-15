import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable
} from '@tanstack/react-table';
import React from 'react';
import { Button } from '../../../components/ui/button';
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
import { useAuth } from '../../../hooks/use-auth';
import { userService } from '../../../services/queries/userQuery';
import { columns } from './columns';
import { SlotModal } from './slot-modal';

const DentistSlotTable = () => {
    const { user } = useAuth();
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const { data: dentistSlots, isLoading } = userService.GetDentistSlotByDentist(
        user?.userId ?? '',
        pagination.pageIndex + 1,
        200
    );
    const defaultData = React.useMemo(() => [], []);
    const table = useReactTable({
        data: dentistSlots ?? defaultData,
        columns,
        rowCount: dentistSlots ? dentistSlots.length : 0,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        debugTable: true,
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        state: {
            sorting,
            columnFilters,
            pagination
        }
    });

    if (isLoading) {
        return <div>...Loading</div>;
    }
    return (
        <div className="grid grid-cols-1 grid-rows-2 gap-x-3 gap-y-3 md:grid-cols-12">
            {/* <div className="col-span-1 min-h-52 md:col-span-3">
                <div className="flex h-full flex-col border-[0.5px]">
                    <div className="bg-neutral-700 px-2 py-3 text-sm font-semibold text-white shadow-md">
                        Bác sỹ
                    </div>
                    {dentists?.map((d) => (
                        <div
                            className={cn(
                                'cursor-pointer px-2 py-3 text-sm font-semibold transition-all hover:bg-neutral-100',
                                d.userId === dentist?.userId ? 'bg-neutral-50 text-primary' : ''
                            )}
                            onClick={() => setDentist(d)}
                        >
                            {d?.name}
                        </div>
                    ))}
                </div>
            </div> */}
            <div className="col-span-1 min-h-52 border-[0.5px] md:col-span-12">
                <div className="ml-auto w-full px-2 py-3">
                    <SlotModal />
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader className="bg-neutral-600/90">
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
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
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
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={pageSize.toString()}>
                                    {pageSize} hàng
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default DentistSlotTable;

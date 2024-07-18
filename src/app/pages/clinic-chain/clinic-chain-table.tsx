import {
    ColumnFiltersState,
    PaginationState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import React from 'react';
import { columns } from './columns';

import { UseQueryResult } from '@tanstack/react-query';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/local/search-box';
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
import { IClinic } from '../../../lib/interfaces/clinics-types/IClinic';
import { clinicService } from '../../../services/queries/clinicQuery';
import { ClinicModal } from './clinic-modal';
const ClinicChainTable = () => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const {
        data: clinics,
        error,
        isLoading
    }: UseQueryResult<IClinic[]> = clinicService.GetClinicsPaging(
        pagination.pageIndex + 1,
        pagination.pageSize,
        columnFilters.length > 0 ? columnFilters[0].id : undefined,
        columnFilters.length > 0 ? (columnFilters[0].value as string) : undefined,
        sorting.length > 0 ? sorting[0].id : 'asc',
        sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : 'asc'
    );

    const { data: total } = clinicService.GetTotalClinic();
    const defaultData = React.useMemo(() => [], []);

    const table = useReactTable({
        data: clinics ?? defaultData,
        columns,
        rowCount: total ?? 1,
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
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <div className="w-full">
            <div className="my-2 items-center">
                <h3 className="text-lg font-bold">Danh sách phòng khám</h3>
                <div className="mt-2 flex justify-between">
                    <Input
                        placeholder="Tìm theo email, số điện thoại"
                        value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                        onChange={(event) =>
                            table.getColumn('email')?.setFilterValue(event.target.value)
                        }
                        className="w-[300px] max-w-lg"
                    />
                    <div>
                        <ClinicModal />
                        <Button variant="link">
                            <a href="/clinic-chain/clinic-service">Thiết lập dịch vụ &gt;&gt;</a>
                        </Button>
                    </div>
                </div>
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
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
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
    );
};

export default ClinicChainTable;

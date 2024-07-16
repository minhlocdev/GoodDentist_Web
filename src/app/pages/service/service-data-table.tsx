'use client';

import { ChevronDownIcon } from '@radix-ui/react-icons';
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
import * as React from 'react';

import { UseQueryResult } from '@tanstack/react-query';
import { Button } from '../../../components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '../../../components/ui/dropdown-menu';
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
import { getCommonPinningStyles } from '../../../lib/column-pinning-style';
import { IService } from '../../../lib/interfaces/services-types/IService';
import { serviceService } from '../../../services/queries/serviceQuery';
import { columns } from './columns';
import { ServiceModal } from './service-modal';

export function ServiceDataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const {
        data: services,
        error,
        isLoading
    }: UseQueryResult<IService[]> = serviceService.GetServices(
        pagination.pageIndex + 1,
        pagination.pageSize,
        columnFilters.length > 0 ? columnFilters[0].id : undefined,
        columnFilters.length > 0 ? (columnFilters[0].value as string) : undefined,
        sorting.length > 0 ? sorting[0].id : undefined,
        sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : undefined
    );
    const { data: total } = serviceService.GetTotalService();
    const defaultData = React.useMemo(() => [], []);

    const table = useReactTable({
        data: services ?? defaultData,
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
            <div className="flex flex-col items-center gap-x-3 py-4 md:flex-row md:items-start">
                <Input
                    placeholder="Tìm theo tên dịch vụ"
                    value={(table.getColumn('serviceName')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('serviceName')?.setFilterValue(event.target.value)
                    }
                    className="w-[300px] max-w-lg"
                />

                <div className="ml-auto flex gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Cột <ChevronDownIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value: unknown) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ServiceModal />
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-neutral-600/90">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const { column } = header;
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className=" text-white"
                                            style={{ ...getCommonPinningStyles(column) }}
                                        >
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
                                        const { column } = cell;
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className="max-w-full truncate"
                                                style={{ ...getCommonPinningStyles(column) }}
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
}

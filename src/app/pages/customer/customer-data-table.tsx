'use client';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
    ColumnFiltersState,
    PaginationState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import * as React from 'react';

import { UseQueryResult } from '@tanstack/react-query';
import { Filter } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '../../../components/ui/collapsible';
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
import { IUser } from '../../../lib/interfaces/user-types/IUser';
import { userService } from '../../../services/queries/userQuery';
import { columns } from './colunms';

export function CustomerDataTable() {
    const { data: users, error, isLoading }: UseQueryResult<IUser[]> = userService.GetUsers();

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const defaultData = React.useMemo(() => [], []);

    const table = useReactTable({
        data: users ?? defaultData,
        columns,
        // pageCount: dataQuery.data?.pageCount ?? -1, //you can now pass in `rowCount` instead of pageCount and `pageCount` will be calculated internally (new in v8.13.0)
        rowCount: 30, //  dataQuery.data?.rowCount,new in v8.13.0 - alternatively, just pass in `pageCount` directly
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        debugTable: true,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination
        }
    });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;
    return (
        <div className="w-full">
            <div className="flex flex-col items-center gap-x-3 py-4 md:flex-row md:items-start">
                <Input
                    placeholder="Tìm theo email, số điện thoại"
                    value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('email')?.setFilterValue(event.target.value)
                    }
                    className="w-[300px] max-w-lg"
                />

                <div className="ml-auto flex gap-4">
                    <Collapsible>
                        <CollapsibleTrigger className="rounded-md border border-blue-500 px-3 py-1 shadow-sm data-[state=open]:bg-blue-100">
                            <div className="flex flex-row items-center gap-2">
                                <Filter className="h-4 w-5" /> Bộ lọc
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                            {/* TODO */}
                            <div className="m-4 w-full border border-neutral-300 p-3">
                                ngày tạo, lịch hẹn, ngày điều trị, bác sĩ điều trị, tình trạng, tỉnh
                                thành phố, quận huyện
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
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
                        <SelectValue placeholder="Theme" />
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

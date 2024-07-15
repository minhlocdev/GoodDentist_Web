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
import { LoaderCircle } from 'lucide-react';
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
import { IClinic } from '../../../lib/interfaces/clinics-types/IClinic';
import { IUser } from '../../../lib/interfaces/user-types/IUser';
import { clinicService } from '../../../services/queries/clinicQuery';
import { userService } from '../../../services/queries/userQuery';
import { columns } from './columns';
import { NewStaffModal } from './new-staff-modal';

export function StaffDataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });
    const {
        data: users,
        error,
        isLoading
    }: UseQueryResult<IUser[]> = userService.GetUsers(
        pagination.pageIndex + 1,
        pagination.pageSize,
        columnFilters.length > 0 ? columnFilters[0].id : undefined,
        columnFilters.length > 0 ? (columnFilters[0].value as string) : undefined,
        sorting.length > 0 ? sorting[0].id : undefined,
        sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : undefined
    );
    const { data: clinics, isLoading: clinicLoading } = clinicService.GetClinics();
    const { data: total } = userService.GetTotalUser();
    const defaultData = React.useMemo(() => [], []);
    const table = useReactTable({
        data: users ?? defaultData,
        columns,
        rowCount: total ?? 1,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination
        }
    });

    if (isLoading) return <div className="text-center">Loading</div>;
    if (error) return <div className="text-center">Error loading users</div>;
    return (
        <div className="w-full">
            <div className="flex items-end gap-x-3 pb-4">
                <Input
                    placeholder="Tìm theo email, số điện thoại, địa chỉ, v.v."
                    value={columnFilters.find((filter) => filter.id === 'search')?.value as string}
                    onChange={(event) =>
                        setColumnFilters([{ id: 'search', value: event.target.value }])
                    }
                    className="max-w-lg"
                />
                <div className="flex flex-col gap-y-1">
                    <span className="text-xs">Tình trạng làm việc</span>
                    <Select
                        defaultValue="all"
                        onValueChange={(value) =>
                            setColumnFilters([
                                { id: 'status', value: value === 'all' ? null : value === 'true' }
                            ])
                        }
                    >
                        <SelectTrigger className="w-[150px] min-w-[150px] p-2 md:w-fit">
                            <SelectValue placeholder="Tình trạng làm việc" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="true">Đang làm việc</SelectItem>
                            <SelectItem value="false">Đã nghỉ</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="ml-auto flex flex-col gap-y-1 ">
                    <span className="text-xs">Chi nhánh</span>

                    <Select
                        defaultValue="all"
                        onValueChange={(value) =>
                            setColumnFilters([{ id: 'clinic', value: value }])
                        }
                    >
                        <SelectTrigger className="w-[150px] min-w-[150px] p-2 md:w-fit">
                            <SelectValue placeholder="Chọn phòng khám" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            {!clinicLoading ? (
                                clinics?.map((clinic: IClinic) => (
                                    <SelectItem key={clinic.clinicId} value={clinic.clinicId}>
                                        {clinic.clinicName}
                                    </SelectItem>
                                ))
                            ) : (
                                <div className="flex justify-center p-2">
                                    <LoaderCircle className="animate-spin" />
                                </div>
                            )}
                        </SelectContent>
                    </Select>
                </div>
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
                <NewStaffModal />
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
}

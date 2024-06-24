import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { clinics } from '../../../lib/interfaces/IClinic';
import { columns } from './columns';

import { Button } from '../../../components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../../../components/ui/table';
const ClinicChainTable = () => {
    const [rowSelection, setRowSelection] = React.useState({});

    const defaultData = React.useMemo(() => [], []);
    const table = useReactTable({
        data: clinics ?? defaultData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection
        }
    });

    return (
        <div className="w-full">
            <div className="my-2 flex items-center justify-between">
                <h3 className="text-lg font-bold">Danh sách phòng khám</h3>
                <div>
                    <Button>Thêm mới</Button>
                    <Button variant="link">
                        <a href="/clinic-chain/report" target="_blank">
                            Xem báo cáo &gt;&gt;
                        </a>
                    </Button>
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
        </div>
    );
};

export default ClinicChainTable;

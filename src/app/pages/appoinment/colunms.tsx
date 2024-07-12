import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<unknown>[] = [
    {
        accessorKey: 'clinicName',
        header: 'Tên phòng khám'
    },
    {
        accessorKey: 'address',
        header: 'Địa chỉ'
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Số điện thoại'
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'status',
        header: 'Trạng thái'
    }
];

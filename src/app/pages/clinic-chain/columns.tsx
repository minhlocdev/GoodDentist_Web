import { ColumnDef } from '@tanstack/react-table';
import { IClinic } from '../../../lib/interfaces/clinics-types/IClinic';

export const columns: ColumnDef<IClinic>[] = [
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

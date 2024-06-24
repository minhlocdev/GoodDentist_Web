import { ColumnDef } from '@tanstack/react-table';
import { IClinic } from '../../../lib/interfaces/IClinic';

export const columns: ColumnDef<IClinic>[] = [
    {
        accessorKey: 'clinic_id',
        header: 'Mã phòng khám'
    },
    {
        accessorKey: 'clinic_name',
        header: 'Tên phòng khám'
    },
    {
        accessorKey: 'address',
        header: 'Địa chỉ'
    },
    {
        accessorKey: 'phone_number',
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

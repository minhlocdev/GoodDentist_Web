import { useState } from 'react';
import { useCalendarStore } from '../../../hooks/use-calendar-store';
import { IUser } from '../../../lib/interfaces/user-types/IUser';
import { cn } from '../../../lib/utils';
import { userService } from '../../../services/queries/userQuery';

const DentistSlotTable = () => {
    const { selectedClinicId } = useCalendarStore();
    const { data: dentists, isLoading } = userService.GetDentistsByClinic(
        selectedClinicId ?? '',
        1,
        200,
        'roleId',
        '2'
    );
    const [dentist, setDentist] = useState<IUser | null>();

    if (isLoading) {
        return <div>...Loading</div>;
    }
    return (
        <div className="grid grid-cols-1 grid-rows-2 gap-x-3 gap-y-3 md:grid-cols-12">
            <div className="col-span-1 min-h-52 md:col-span-3">
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
            </div>
            <div className="col-span-1 min-h-52 border-[0.5px] md:col-span-9"></div>
        </div>
    );
};

export default DentistSlotTable;

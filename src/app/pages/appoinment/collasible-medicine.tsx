import { useCalendarStore } from '../../../hooks/use-calendar-store';
import CalendarCollapsible from './calendar-collapsible';

const CollapseMedicine = () => {
    const { selectedEvent } = useCalendarStore();
    return (
        <CalendarCollapsible
            title="Đơn thuốc"
            content={
                <>
                    <div className="grid grid-cols-2 gap-2 text-[14px]">
                        {selectedEvent?.prescriptions?.map((p) => (
                            <>
                                <div className="col-span-2 text-center font-bold text-neutral-700/90">
                                    {p.note}
                                </div>
                                {p.medicinePrescriptions?.map((medicine) => (
                                    <>
                                        <div className="">{medicine?.medicine?.medicineName}</div>
                                        <div className="font-bold text-primary">
                                            {medicine?.medicine?.quantity} {medicine.medicine?.unit}
                                        </div>
                                    </>
                                ))}
                            </>
                        ))}
                    </div>
                </>
            }
        />
    );
};

export default CollapseMedicine;

import { useCalendarStore } from '../../../hooks/use-calendar-store';
import CalendarCollapsible from './calendar-collapsible';
const CollapseTreatment = () => {
    const { selectedEvent } = useCalendarStore();

    return (
        <CalendarCollapsible
            title="Khám & điều trị"
            content={
                <>
                    <div className="grid grid-cols-2 gap-2 text-[14px]">
                        {selectedEvent?.orders?.map((o) => (
                            <>
                                <div className="col-span-2 text-center font-bold text-neutral-700/90">
                                    {o.orderName}
                                </div>
                                {o.orderServices?.map((service) => (
                                    <>
                                        <div className="">{service.service?.serviceName}</div>
                                        <div className="font-bold text-primary">
                                            {service.price}đ
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

export default CollapseTreatment;

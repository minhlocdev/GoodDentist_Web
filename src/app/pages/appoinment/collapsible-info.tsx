import { format } from 'date-fns';
import { useCalendarStore } from '../../../hooks/use-calendar-store';
import CalendarCollapsible from './calendar-collapsible';

const CollapseInfo = () => {
    const { selectedEvent } = useCalendarStore();
    return (
        <CalendarCollapsible
            title="Thông tin cơ bản"
            content={
                <div className="grid grid-flow-row-dense grid-cols-2 gap-y-3 text-sm">
                    <div className="font-bold text-neutral-700/90">Điện thoại</div>
                    <div className="break-all">
                        {selectedEvent?.examinationProfile?.customer?.phoneNumber}
                    </div>
                    <div className="font-bold text-neutral-700/90">Ngày sinh</div>
                    <div>
                        {format(
                            selectedEvent?.examinationProfile?.customer?.dob ?? new Date(),
                            'dd-MM-yyyy'
                        )}
                    </div>
                    <div className="font-bold text-neutral-700/90">Email</div>
                    <div className="break-all">
                        {selectedEvent?.examinationProfile?.customer?.email}
                    </div>
                    <div className="font-bold text-neutral-700/90">Địa chỉ</div>
                    <div className="break-all">
                        {selectedEvent?.examinationProfile?.customer?.address}
                    </div>
                    <div className="font-bold text-neutral-700/90">Tiền sử bệnh</div>
                    <div className="break-all">
                        {selectedEvent?.examinationProfile?.customer?.address}
                    </div>
                </div>
            }
        />
    );
};

export default CollapseInfo;

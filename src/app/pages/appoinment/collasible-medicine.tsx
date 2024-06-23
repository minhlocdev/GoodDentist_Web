import { format } from 'date-fns';
import CalendarCollapsible from './calendar-collapsible';

const CollapseMedicine = () => {
    return (
        <CalendarCollapsible
            title="Đơn thuốc"
            content={
                <>
                    <div className="flex gap-2 text-[14px]">
                        <div className="w-[100px] min-w-[100px] font-bold text-neutral-700/90">
                            {format(new Date(), 'dd-MM-yyyy')}
                        </div>
                        <div>ĐTT TIẾP</div>
                    </div>
                    <div className="flex gap-2 text-[14px]">
                        <div className="w-[100px] min-w-[100px] font-bold text-neutral-700/90">
                            {format(new Date(), 'dd-MM-yyyy')}
                        </div>
                        <div>CHỈNH NHA CỐ ĐỊNH MẮC CÀI KIM LOẠI KHE 22</div>
                    </div>
                </>
            }
        />
    );
};

export default CollapseMedicine;

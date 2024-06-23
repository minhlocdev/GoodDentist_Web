import CalendarCollapsible from './calendar-collapsible';

const CollapseInfo = () => {
    return (
        <CalendarCollapsible
            title="Thông tin cơ bản"
            content={
                <>
                    <div className="flex gap-2 text-[14px]">
                        <div className="w-[100px] min-w-[100px] font-bold text-neutral-700/90">
                            Điện thoại
                        </div>
                        <div>0983263601</div>
                    </div>
                    <div className="flex gap-2 text-[14px]">
                        <div className="w-[100px] min-w-[100px] font-bold text-neutral-700/90">
                            Nghề nghiệp
                        </div>
                        <div></div>
                    </div>
                    <div className="flex gap-2 text-[14px]">
                        <div className="w-[100px] min-w-[100px] font-bold text-neutral-700/90">
                            Địa chỉ
                        </div>
                        <div>Quận 3 - Quận 3 - Thành phố Hồ Chí Minh</div>
                    </div>
                    <div className="flex gap-2 text-[14px]">
                        <div className="w-[100px] min-w-[100px] font-bold text-neutral-700/90">
                            Lí do khám
                        </div>
                        <div>Đau răng</div>
                    </div>
                    <div className="flex gap-2 text-[14px]">
                        <div className="w-[100px] min-w-[100px] font-bold text-neutral-700/90">
                            Tiền sử bệnh
                        </div>
                    </div>
                    <div className="flex gap-2 text-[14px]">
                        <div className="w-[100px] min-w-[100px] font-bold text-neutral-700/90">
                            Ghi chú
                        </div>
                    </div>
                </>
            }
        />
    );
};

export default CollapseInfo;

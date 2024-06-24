// import { generateTimeSlots } from '../../../lib/calendar-utils';
import { UserIcon } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import AppointmentLayout from './appointment-layout';

const AppointmentPage = () => {
    return (
        // <AppointmentLayout title="Danh sách lịch hẹn">
        //     {/* Toolbar */}
        //     <div className="sticky top-[55px] z-10 h-14 w-full border-t border-neutral-200 bg-white">
        //         Tool bar
        //     </div>
        //     <div className="flex min-h-screen w-full flex-1 flex-col">
        //         {/* Header */}
        //         <div className="sticky top-[111px] z-10 h-20 bg-blue-500">Header</div>
        //         {/* Body */}
        //         <div className="w-full flex-1 overflow-y-auto">
        //             <div className="flex flex-1 flex-col items-start bg-blue-800 p-4">
        //                 {generateTimeSlots().map((slot) => (
        //                     <div data-time={`${slot.time}`}>{slot.time}</div>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // </AppointmentLayout>

        <AppointmentLayout title="Danh sách lịch hẹn">
            <div className="relative flex flex-col">
                <div className="flex items-center justify-between bg-white p-4">
                    <div className="flex space-x-2">
                        <Button variant="outline">Ngày</Button>
                        <Button variant="outline">Tuần</Button>
                        <Button variant="outline">Tháng</Button>
                    </div>
                    <div className="text-lg font-semibold">Thứ Hai, 10-06-2024</div>
                    <div className="flex items-center space-x-2"></div>
                </div>
                <div className="flex flex-auto">
                    <div className="w-1/4 space-y-4 bg-[#E1D5F0] p-4">
                        <div className="flex items-center space-x-2">
                            <UserIcon className="text-gray-500" />
                            <span>BS Hoàng Văn Tiến</span>
                        </div>
                        <div className="flex flex-col space-y-2">
                            {Array.from({ length: 8 }, (_, i) => (
                                <div key={i} className="h-10 bg-[#D6BCF2]" />
                            ))}
                        </div>
                    </div>
                    <div className="w-1/4 space-y-4 bg-[#F3E2C7] p-4">
                        <div className="flex items-center space-x-2">
                            <UserIcon className="text-gray-500" />
                            <span>BS Nguyễn Như Vũ</span>
                        </div>
                        <div className="flex flex-col space-y-2">
                            {Array.from({ length: 8 }, (_, i) => (
                                <div key={i} className="h-10 bg-[#F5DAB1]" />
                            ))}
                        </div>
                    </div>
                    <div className="w-1/4 space-y-4 bg-[#D1E8D1] p-4">
                        <div className="flex items-center space-x-2">
                            <UserIcon className="text-gray-500" />
                            <span>BS Bùi Mai Hương</span>
                        </div>
                        <div className="flex flex-col space-y-2">
                            {Array.from({ length: 8 }, (_, i) => (
                                <div key={i} className="h-10 bg-[#C4E3C3]" />
                            ))}
                        </div>
                    </div>
                    <div className="w-1/4 space-y-4 bg-white p-4">
                        <div className="flex items-center space-x-2">
                            <UserIcon className="text-gray-500" />
                            <span>Nguyễn Ninh Dương</span>
                        </div>
                        <div className="flex flex-col space-y-2">
                            {Array.from({ length: 8 }, (_, i) => (
                                <div key={i} className="h-10 bg-[#E8E8E8]" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppointmentLayout>
    );
};

export default AppointmentPage;

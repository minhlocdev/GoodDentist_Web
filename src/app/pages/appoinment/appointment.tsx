import { generateTimeSlots } from '../../../lib/calendar-utils';
import AppointmentLayout from './appointment-layout';

const AppointmentPage = () => {
    return (
        <AppointmentLayout title="Danh sách lịch hẹn">
            {/* Toolbar */}
            <div className="sticky top-[55px] z-10 h-14 w-full border-t border-neutral-200 bg-white">
                Tool bar
            </div>
            <div className="flex min-h-screen w-full flex-1 flex-col">
                {/* Header */}
                <div className="sticky top-[111px] z-10 h-20 bg-blue-500">Header</div>
                {/* Body */}
                <div className="w-full flex-1 overflow-y-auto">
                    <div className="flex flex-1 flex-col items-start bg-blue-800 p-4">
                        {generateTimeSlots().map((slot) => (
                            <div data-time={`${slot.time}`}>{slot.time}</div>
                        ))}
                    </div>
                </div>
            </div>
        </AppointmentLayout>
    );
};

export default AppointmentPage;

import { format } from 'date-fns';
import { AppointmentStatusNames, EVENT_STATUS_COLORS } from '../../../lib/events';
import { IExamination } from '../../../lib/interfaces/examination-types/IExamination';
import { TreatmentModal } from './treatment-modal';

interface TreatDiagTableProps {
    examinations: IExamination[];
}
const TreatDiagTable = ({ examinations }: TreatDiagTableProps) => {
    return (
        <table className="min-w-full rounded-md border border-gray-200 bg-white shadow-lg">
            <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-gray-600">Bác sỹ điều trị</th>
                    <th className="px-4 py-2 text-left text-gray-600">Ngày giờ khám</th>
                    <th className="px-4 py-2 text-left text-gray-600">Nội dung khám</th>
                    <th className="px-4 py-2 text-left text-gray-600">Chuẩn đoán</th>
                    <th className="px-4 py-2 text-left text-gray-600">Trạng thái</th>
                    <th className="px-4 py-2 text-center text-gray-600">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {examinations?.map((ex, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border-t px-4 py-2">{ex.dentistName}</td>
                        <td className="border-t px-4 py-2">
                            {format(new Date(ex.timeStart), 'dd-MM-yyyy HH:mm')}
                        </td>
                        <td className="border-t px-4 py-2">{ex.notes}</td>
                        <td className="border-t px-4 py-2">{ex.diagnosis}</td>
                        <td className="border-t px-4 py-2">
                            <div
                                style={{
                                    backgroundColor: EVENT_STATUS_COLORS[ex.status! - 1 ?? 0]
                                }}
                                className="rounded-md py-2 text-center font-semibold text-neutral-700"
                            >
                                {AppointmentStatusNames[ex.status! - 1 ?? 0]}
                            </div>
                        </td>
                        <td className="flex items-center justify-center border-t px-4 py-2">
                            {ex.orders?.length === 0 && <TreatmentModal examination={ex} />}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TreatDiagTable;

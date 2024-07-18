import { format } from 'date-fns';
import React, { useState } from 'react';
import { useExaminationStore } from '../../../hooks/use-examination-store';
import { IMedicine } from '../../../lib/interfaces/IMedicine';
import { IPrescription } from '../../../lib/interfaces/IPrescription';
import { IExamination } from '../../../lib/interfaces/examination-types/IExamination';
import { cn } from '../../../lib/utils';

const MedicineTable = () => {
    const { examProfilesData } = useExaminationStore();
    const [expandedExamination, setExpandedExamination] = useState<IExamination | null>(null);
    const toggleExpandedExamination = (examination: IExamination) => {
        setExpandedExamination((prevExamination) =>
            prevExamination?.examinationId === examination.examinationId ? null : examination
        );
    };
    const renderPrescriptions = (prescriptions: IPrescription[]) => (
        <table className="w-full">
            <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-gray-600">Ngày tạo</th>
                    <th className="px-4 py-2 text-left text-gray-600">Mã đơn thuốc</th>
                    <th className="max-w-[100px] px-4 py-2 text-left text-gray-600">Ghi chú</th>
                </tr>
            </thead>
            <tbody>
                {prescriptions.map((prescription, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border-t px-4 py-2">
                            {format(new Date(prescription.dateTime!), 'dd-MM-yyyy HH:mm')}
                        </td>
                        <td className="border-t px-4 py-2">{prescription.prescriptionId}</td>
                        <td className="max-w-[100px] border-t px-4  py-2">{prescription.note}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
    const renderMedicines = (medicines: IMedicine[]) => (
        <table className="w-full">
            <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-gray-600">Mã thuốc</th>
                    <th className="px-4 py-2 text-left text-gray-600">Tên thuốc</th>
                    <th className="px-4 py-2 text-left text-gray-600">Loại</th>
                    <th className="px-4 py-2 text-left text-gray-600">Số lượng</th>
                    <th className="px-4 py-2 text-left text-gray-600">Đơn vị</th>
                    <th className="px-4 py-2 text-left text-gray-600">Mô tả</th>
                    <th className="px-4 py-2 text-left text-gray-600">Giá</th>
                </tr>
            </thead>
            <tbody>
                {medicines.map((medicine, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border-t px-4 py-2">{medicine.medicineId}</td>
                        <td className="border-t px-4 py-2">{medicine.medicineName}</td>
                        <td className="border-t px-4 py-2">{medicine.type}</td>
                        <td className="border-t px-4 py-2">{medicine.quantity}</td>
                        <td className="border-t px-4 py-2">{medicine.unit}</td>
                        <td className="border-t px-4 py-2">{medicine.description}</td>
                        <td className="border-t px-4 py-2">{medicine.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="flex flex-col gap-y-4">
            <table className="min-w-full rounded-md border border-gray-200 bg-white shadow-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-gray-600">Ngày điều trị</th>
                        <th className="px-4 py-2 text-left text-gray-600">Bác sĩ kê đơn</th>
                        <th className="px-4 py-2 text-center text-gray-600">Đơn thuốc</th>
                    </tr>
                </thead>
                <tbody>
                    {examProfilesData?.map((exam) =>
                        exam.examinations?.map((ex, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    className={cn(
                                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                                        'cursor-pointer transition-colors hover:bg-blue-50'
                                    )}
                                    onClick={() => toggleExpandedExamination(ex)}
                                >
                                    <td className="border-t px-4 py-2">
                                        {format(new Date(ex.timeStart), 'dd-MM-yyyy HH:mm')}
                                    </td>
                                    <td className="border-t px-4 py-2">{ex.dentistName}</td>
                                    <td className="border-t px-4 py-2">
                                        {ex.prescriptions!.length > 0 &&
                                            renderPrescriptions(ex.prescriptions!)}
                                    </td>
                                </tr>
                                {expandedExamination?.examinationId === ex.examinationId && (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-2">
                                            {ex.prescriptions?.flatMap((prescription) =>
                                                prescription.medicinePrescriptions?.map(
                                                    (mediPres) => mediPres.medicine
                                                )
                                            ) &&
                                                renderMedicines(
                                                    ex.prescriptions
                                                        ?.flatMap((prescription) =>
                                                            prescription.medicinePrescriptions?.map(
                                                                (mediPres) => mediPres.medicine
                                                            )
                                                        )
                                                        .filter(Boolean) as IMedicine[]
                                                )}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MedicineTable;

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '../../../components/ui/accordion';
import { useExaminationStore } from '../../../hooks/use-examination-store';
import TreatDiagTable from './treament-diag-table';
import TreatOrderTable from './treatment-orders-table';

const TreatmentProfile = () => {
    const { examProfilesData } = useExaminationStore();
    return (
        <div className="mb-2 flex w-full flex-col justify-between gap-y-6">
            <h1 className="text-lg font-semibold">Khám và điều trị</h1>
            <Accordion type="single" collapsible className="w-full">
                {examProfilesData?.map((exam) => (
                    <AccordionItem
                        key={exam.examinationProfileId.toString()}
                        value={exam.examinationProfileId.toString()}
                    >
                        <AccordionTrigger
                            key={exam.examinationProfileId}
                            className="w-full flex-1 [&[data-state=open]>div>div>svg]:rotate-180"
                        >
                            <div className="flex w-full items-center justify-between rounded-md bg-neutral-200 px-4 py-3">
                                <div className="flex items-center font-semibold">
                                    <p>
                                        Ngày khám {exam.date} - {exam.diagnosis}
                                    </p>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-y-2 overflow-hidden border border-neutral-200 bg-white px-2 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                            <Accordion type={'multiple'}>
                                <AccordionItem value={'tongquat'}>
                                    <AccordionTrigger>
                                        <div className="w-full border-b p-3 text-left uppercase">
                                            Khám tổng quát
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex gap-x-4 px-5">
                                            <h3>Bác sỹ khám</h3>
                                            <p>BS {exam.dentist?.name}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value={'dieutri'}>
                                    <AccordionTrigger>
                                        <div className="w-full border-b p-3 text-left uppercase">
                                            Chuẩn đoán và điều trị
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex gap-x-4 px-5">
                                            <h3>Chuẩn đoán chung</h3>
                                            <p>{exam.diagnosis}</p>
                                        </div>
                                        <div className="mt-3 w-full flex-1 px-5">
                                            <TreatDiagTable
                                                examinations={exam.examinations ?? []}
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <div className="flex w-full justify-between">
                                <div className="w-full border-b p-3 text-left font-semibold uppercase">
                                    Kế hoạch điều trị
                                </div>
                            </div>
                            <div className="mt-3 w-full flex-1 px-5">
                                <TreatOrderTable examinations={exam.examinations} />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default TreatmentProfile;

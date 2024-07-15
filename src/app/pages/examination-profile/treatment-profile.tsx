import { ChevronDown } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '../../../components/ui/collapsible';
import { IExaminationProfile } from '../../../lib/interfaces/others/IExaminationProfile';

interface TreatmentProfileProps {
    examProfiles?: IExaminationProfile[];
}

const TreatmentProfile = ({ examProfiles }: TreatmentProfileProps) => {
    console.log(examProfiles);
    return (
        <div className="mb-2 flex w-full flex-col justify-between gap-y-6">
            <h1 className="text-lg font-semibold">Khám và điều trị</h1>
            <Collapsible className="flex-1">
                {examProfiles?.map((exam) => (
                    <>
                        <CollapsibleTrigger
                            key={exam.examinationProfileId}
                            className="mb-1 w-full flex-1 [&[data-state=open]>div>div>svg]:rotate-180"
                            asChild
                        >
                            <Button variant={'secondary'} className="h-10 w-full justify-start">
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center font-semibold">
                                        <p>
                                            Ngày khám {exam.date} - {exam.diagnosis}
                                        </p>
                                    </div>
                                    <div>
                                        <ChevronDown
                                            size={18}
                                            className="transition-transform duration-200"
                                        />
                                    </div>
                                </div>
                            </Button>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="flex flex-col gap-y-2 overflow-hidden px-2 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                            Yes. Free to use for personal and commercial projects. No attribution
                            required.
                        </CollapsibleContent>
                    </>
                ))}
            </Collapsible>
        </div>
    );
};

export default TreatmentProfile;

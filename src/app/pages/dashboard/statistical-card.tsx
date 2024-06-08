import { Info } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '../../../components/ui/tooltip';

interface StatisticalcardProp {
    title: string;
    statistic: number;
    unit: string;
    desc?: string;
}

const StatisticalCard: React.FC<StatisticalcardProp> = ({ title, statistic, unit, desc }) => {
    return (
        <div className="flex h-[12rem] min-w-[200px] flex-col items-center justify-start border border-neutral-300 bg-white p-7 shadow-md">
            <h1 className="flex w-full flex-row items-start text-lg font-bold">
                {title}

                {String(desc).length > 0 && desc != undefined && (
                    <TooltipProvider>
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger className="ml-3">
                                <div className="flex w-full items-center justify-center">
                                    <Info className="h-3 w-3" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p className="max-w-[200px]">{desc}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </h1>
            <div className="flex w-full flex-col items-start gap-y-5">
                <span>({unit})</span>
                <h4 className="text-4xl font-bold text-primary">{statistic}</h4>
            </div>
        </div>
    );
};

export default StatisticalCard;

import { ChevronDown } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '../../../components/ui/collapsible';
import { cn } from '../../../lib/utils';
interface CollapsibleSectionProps {
    title: string;
    content: ReactNode;
}
const CalendarCollapsible: React.FC<CollapsibleSectionProps> = ({ title, content }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <Collapsible open={isCollapsed} onOpenChange={handleCollapse} className="w-full">
            <CollapsibleTrigger
                className="mb-1 [&[data-state=open]>div>div>svg]:rotate-180"
                asChild
            >
                <Button variant={'secondary'} className="h-10 w-full justify-start">
                    <div className="flex w-full items-center justify-between">
                        <div className="flex items-center font-semibold">
                            <p className={cn('max-w-[150px] truncate')}>{title}</p>
                        </div>
                        <div>
                            <ChevronDown size={18} className="transition-transform duration-200" />
                        </div>
                    </div>
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-y-2 overflow-hidden px-2 data-[state=open]:animate-collapsible-down">
                <div className="py-3">{content}</div>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default CalendarCollapsible;

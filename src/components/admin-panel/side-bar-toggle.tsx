import { ChevronLeft } from 'lucide-react';

import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

interface SideBarToggleProps {
    isOpen: boolean;
    setIsOpen?: () => void;
}

export const SideBarToggle: React.FC<SideBarToggleProps> = ({ isOpen, setIsOpen }) => {
    return (
        <div className="invisible absolute -right-[16px] top-[12px] z-20 bg-white dark:bg-primary-foreground lg:visible">
            <Button
                onClick={() => setIsOpen?.()}
                className="h-8
                w-8 rounded-md border border-input bg-background shadow-sm
                hover:bg-accent hover:text-accent-foreground"
            >
                <ChevronLeft
                    className={cn(
                        'h-4 w-4 transition-transform duration-700 ease-in-out',
                        isOpen === false ? 'rotate-180' : 'rotate-0'
                    )}
                />
            </Button>
        </div>
    );
};

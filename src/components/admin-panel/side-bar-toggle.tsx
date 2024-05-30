import { ChevronLeft } from 'lucide-react';

import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

interface SideBarToggleProps {
    isOpen: boolean;
    setIsOpen?: () => void;
}

export const SideBarToggle: React.FC<SideBarToggleProps> = ({ isOpen, setIsOpen }) => {
    return (
        <div className="dark:bg-primary-foreground invisible absolute -right-[16px] top-[12px] z-20 bg-white lg:visible">
            <Button
                onClick={() => setIsOpen?.()}
                className="border-input
                bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-md
                border shadow-sm"
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

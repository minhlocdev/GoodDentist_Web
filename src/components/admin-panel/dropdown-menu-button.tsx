import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import { ChevronDown, Dot, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface Submenu {
    href: string;
    label: string;
    active: boolean;
}

interface CollapseMenuButtonProps {
    icon: LucideIcon;
    label: string;
    active: boolean;
    submenus: Submenu[];
    isOpen: boolean | undefined;
}

export function CollapseMenuButton({
    icon: Icon,
    label,
    submenus,
    isOpen
}: CollapseMenuButtonProps) {
    const isSubmenuActive = submenus.some((submenu) => submenu.active);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

    return isOpen ? (
        <Collapsible open={isCollapsed} onOpenChange={setIsCollapsed} className="w-full">
            <CollapsibleTrigger
                className="mb-1 [&[data-state=open]>div>div>svg]:rotate-180"
                asChild
            >
                <Button className="h-10 w-full justify-start">
                    <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                            <span className="mr-4">
                                <Icon size={18} />
                            </span>
                            <p
                                className={cn(
                                    'max-w-[150px] truncate',
                                    isOpen
                                        ? 'translate-x-0 opacity-100'
                                        : '-translate-x-96 opacity-0'
                                )}
                            >
                                {label}
                            </p>
                        </div>
                        <div
                            className={cn(
                                'whitespace-nowrap',
                                isOpen ? 'translate-x-0 opacity-100' : '-translate-x-96 opacity-0'
                            )}
                        >
                            <ChevronDown size={18} className="transition-transform duration-200" />
                        </div>
                    </div>
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                {submenus.map(({ href, label }, index) => (
                    <Button key={index} className="mb-1 h-10 w-full justify-start" asChild>
                        <a href={href}>
                            <span className="ml-2 mr-4">
                                <Dot size={18} />
                            </span>
                            <p
                                className={cn(
                                    'max-w-[170px] truncate',
                                    isOpen
                                        ? 'translate-x-0 opacity-100'
                                        : '-translate-x-96 opacity-0'
                                )}
                            >
                                {label}
                            </p>
                        </a>
                    </Button>
                ))}
            </CollapsibleContent>
        </Collapsible>
    ) : (
        <DropdownMenu>
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button className="mb-1 h-10 w-full justify-center">
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center">
                                        <span className={cn(isOpen === false ? '' : 'mr-4')}>
                                            <Icon size={18} />
                                        </span>
                                        <p
                                            className={cn(
                                                'max-w-[200px] truncate',
                                                isOpen === false ? 'opacity-0' : 'opacity-100'
                                            )}
                                        >
                                            {label}
                                        </p>
                                    </div>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="start" alignOffset={2}>
                        {label}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent side="right" sideOffset={25} align="start">
                <DropdownMenuLabel className="max-w-[190px] truncate">{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {submenus.map(({ href, label }, index) => (
                    <DropdownMenuItem key={index} asChild>
                        <a className="cursor-pointer" href={href}>
                            <p className="max-w-[180px] truncate">{label}</p>
                        </a>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuArrow className="fill-border" />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

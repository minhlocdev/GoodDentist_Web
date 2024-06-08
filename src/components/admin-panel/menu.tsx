import { Ellipsis, LogOut, LucideIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { getMenuList } from '../../lib/menu-list';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { CollapseMenuButton } from './dropdown-menu-button';

interface MenuProbs {
    isOpen: boolean | undefined;
}

const Menu: React.FC<MenuProbs> = ({ isOpen }) => {
    const { pathname } = useLocation();
    const menuList = getMenuList(pathname);

    return (
        <ScrollArea className="[&>div>div[style]]:!block">
            <nav className="mt-8 h-full w-full">
                <ul className="flex flex-col items-start space-y-1 px-2">
                    {menuList.map(({ groupLabel, menus }, index) => (
                        <li className={cn('w-full', groupLabel ? 'pt-5' : '')} key={index}>
                            {(isOpen && groupLabel) ?? isOpen === undefined ? (
                                <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                                    {groupLabel}
                                </p>
                            ) : !isOpen && isOpen !== undefined && groupLabel ? (
                                <TooltipProvider>
                                    <Tooltip delayDuration={100}>
                                        <TooltipTrigger className="w-full">
                                            <div className="flex w-full items-center justify-center">
                                                <Ellipsis className="h-5 w-5" />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p>{groupLabel}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (
                                <p className="pb-2"></p>
                            )}
                            {menus.map(({ href, label, icon: Icon, active, submenus }, index) =>
                                submenus.length === 0 ? (
                                    <div className="w-full" key={index}>
                                        <TooltipProvider disableHoverableContent>
                                            <Tooltip delayDuration={100}>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        className="mb-1 h-10 w-full justify-start"
                                                        asChild
                                                        variant={active ? 'secondary' : 'ghost'}
                                                    >
                                                        <a href={href}>
                                                            <span
                                                                className={cn(
                                                                    isOpen === false ? '' : 'mr-4'
                                                                )}
                                                            >
                                                                <Icon size={18} />
                                                            </span>
                                                            <p
                                                                className={cn(
                                                                    'max-w-[200px] truncate',
                                                                    isOpen === false
                                                                        ? '-translate-x-96 opacity-0'
                                                                        : 'translate-x-0 opacity-100'
                                                                )}
                                                            >
                                                                {label}
                                                            </p>
                                                        </a>
                                                    </Button>
                                                </TooltipTrigger>
                                                {isOpen === false && (
                                                    <TooltipContent side="right">
                                                        {label}
                                                    </TooltipContent>
                                                )}
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                ) : (
                                    <div className="w-full" key={index}>
                                        <CollapseMenuButton
                                            icon={Icon as LucideIcon}
                                            label={label}
                                            active={active}
                                            submenus={submenus}
                                            isOpen={isOpen}
                                        />
                                    </div>
                                )
                            )}
                        </li>
                    ))}
                    <li className="flex w-full grow items-end">
                        <TooltipProvider disableHoverableContent>
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                    <Button
                                        // onClick={() => {}}
                                        variant="outline"
                                        className="mt-5 h-10 w-full justify-center"
                                    >
                                        <span className={cn(isOpen === false ? '' : 'mr-4')}>
                                            <LogOut size={18} />
                                        </span>
                                        <p
                                            className={cn(
                                                'whitespace-nowrap',
                                                isOpen === false
                                                    ? 'hidden opacity-0'
                                                    : 'opacity-100'
                                            )}
                                        >
                                            Sign out
                                        </p>
                                    </Button>
                                </TooltipTrigger>
                                {isOpen === false && (
                                    <TooltipContent side="right">Sign out</TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    </li>
                </ul>
            </nav>
        </ScrollArea>
    );
};

export default Menu;

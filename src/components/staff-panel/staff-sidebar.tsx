import { PanelsTopLeft } from 'lucide-react';
import { useStore } from 'zustand';
import { SidebarToggle } from '../admin-panel/side-bar-toggle';

import { useSidebarToggle } from '../../hooks/use-sidebar-toggle';
import { cn } from '../../lib/utils';

import { Button } from '../ui/button';
import StaffMenu from './staff-menu';

export const StaffSidebar = () => {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0',
                sidebar?.isOpen === false ? 'w-[90px]' : 'w-72'
            )}
        >
            <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
            <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
                <Button
                    className={cn(
                        'mb-1 transition-transform duration-300 ease-in-out',
                        sidebar?.isOpen === false ? 'translate-x-1' : 'translate-x-0'
                    )}
                    variant={'link'}
                    asChild
                >
                    <a>
                        <PanelsTopLeft className="mr-1 h-6 w-6" />
                        <h1
                            className={cn(
                                'whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out',
                                sidebar?.isOpen === false
                                    ? 'hidden -translate-x-96 opacity-0'
                                    : 'translate-x-0 opacity-100'
                            )}
                        >
                            Good Dentist
                        </h1>
                    </a>
                </Button>
                <StaffMenu isOpen={sidebar?.isOpen} />
            </div>
        </aside>
    );
};

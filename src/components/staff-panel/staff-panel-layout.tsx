import { useStore } from 'zustand';
import { useSidebarToggle } from '../../hooks/use-sidebar-toggle';
import { cn } from '../../lib/utils';
import { Footer } from '../admin-panel/footer';
import { StaffSidebar } from './staff-sidebar';

export default function StaffPanelLayout({ children }: { children: React.ReactNode }) {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <>
            <StaffSidebar />
            <main
                className={cn(
                    'min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900',
                    sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72'
                )}
            >
                {children}
            </main>
            <footer
                className={cn(
                    'transition-[margin-left] duration-300 ease-in-out',
                    sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72'
                )}
            >
                <Footer />
            </footer>
        </>
    );
}
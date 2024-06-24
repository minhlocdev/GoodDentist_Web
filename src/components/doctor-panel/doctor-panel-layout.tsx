import { useStore } from 'zustand';
import { useSidebarToggle } from '../../hooks/use-sidebar-toggle';
import { cn } from '../../lib/utils';
import { Footer } from '../admin-panel/footer';
import { DoctorSidebar } from './doctor-sidebar';

export default function DoctorPanelLayout({ children }: { children: React.ReactNode }) {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <>
            <DoctorSidebar />
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

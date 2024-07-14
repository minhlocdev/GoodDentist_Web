import { CalendarDays, List, LoaderCircle } from 'lucide-react';
import { useAuth } from '../../../hooks/use-auth';
import { useCalendarStore } from '../../../hooks/use-calendar-store';
import { IClinic } from '../../../lib/interfaces/clinics-types/IClinic';
import { cn } from '../../../lib/utils';
import { clinicService } from '../../../services/queries/clinicQuery';
import { DatePicker } from '../date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { SheetMenu } from './sheet-menu';
import { UserNav } from './user-nav';

export function CalendarNavbar() {
    const { user } = useAuth();
    const calendar = useCalendarStore();
    const { data: clinics, isLoading } = clinicService.GetClinics();

    return (
        <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 flex h-14 items-center sm:mx-8">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <SheetMenu />
                </div>
                <div className="left hidden gap-2 md:flex">
                    <div>
                        <DatePicker value={calendar?.selectedDate} onChange={calendar?.setDate} />
                    </div>
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        <button
                            type="button"
                            className={cn(
                                `rounded-s-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-blue-100 hover:text-blue-700  dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500`,
                                calendar?.view === 'day'
                                    ? 'z-10 bg-blue-100 text-blue-700 ring-1 ring-blue-400 '
                                    : ''
                            )}
                            onClick={() => calendar?.setView('day')}
                        >
                            Ngày
                        </button>
                        <button
                            type="button"
                            className={cn(
                                'border-b border-t border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500',
                                calendar?.view === 'week'
                                    ? 'z-10 bg-blue-100 text-blue-700 ring-1 ring-blue-400 '
                                    : ''
                            )}
                            onClick={() => calendar?.setView('week')}
                        >
                            Tuần
                        </button>
                        <button
                            type="button"
                            className={cn(
                                'rounded-e-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500',
                                calendar?.view === 'month'
                                    ? 'z-10 bg-blue-100 text-blue-700 ring-1 ring-blue-400 '
                                    : ''
                            )}
                            onClick={() => calendar?.setView('month')}
                        >
                            Tháng
                        </button>
                    </div>
                    <div className="ml-5 inline-flex rounded-md shadow-sm" role="group">
                        <button
                            type="button"
                            className={cn(
                                'rounded-s-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500',
                                calendar?.mode === 'calendar'
                                    ? 'z-10 bg-blue-100 text-blue-700 ring-1 ring-blue-400 '
                                    : ''
                            )}
                            onClick={() => calendar?.setMode('calendar')}
                        >
                            <CalendarDays className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            className={cn(
                                'rounded-e-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500',
                                calendar?.mode === 'list'
                                    ? 'z-10 bg-blue-100 text-blue-700 ring-1 ring-blue-400 '
                                    : ''
                            )}
                            onClick={() => calendar?.setMode('list')}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                    <Select
                        onValueChange={(value) => calendar.setClinic(value)}
                        value={calendar.selectedClinicId ?? ''}
                        disabled={user?.roleId !== 1}
                    >
                        <SelectTrigger className="ml-5 min-w-[200px]">
                            <SelectValue placeholder="Chọn phòng khám" />
                        </SelectTrigger>
                        <SelectContent>
                            {!isLoading ? (
                                clinics?.map((clinic: IClinic) => (
                                    <SelectItem key={clinic.clinicId} value={clinic.clinicId}>
                                        {clinic.clinicName}
                                    </SelectItem>
                                ))
                            ) : (
                                <div className="flex justify-center p-2">
                                    <LoaderCircle className="animate-spin" />
                                </div>
                            )}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <UserNav />
                </div>
            </div>
            {/* mobile */}
            <div className="flex flex-wrap items-center justify-center gap-2 border border-neutral-200 p-3 md:hidden">
                <div>
                    <DatePicker value={calendar?.selectedDate} onChange={calendar?.setDate} />
                </div>
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        className={cn(
                            `rounded-s-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-blue-100 hover:text-blue-700  dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500`,
                            calendar?.view === 'day'
                                ? 'z-10 bg-blue-100 text-blue-700 ring-1 ring-blue-400 '
                                : ''
                        )}
                        onClick={() => calendar?.setView('day')}
                    >
                        Ngày
                    </button>
                    <button
                        type="button"
                        className={cn(
                            'border-b border-t border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500',
                            calendar?.view === 'week'
                                ? 'z-10 bg-blue-100 text-blue-700 ring-1 ring-blue-400 '
                                : ''
                        )}
                        onClick={() => calendar?.setView('week')}
                    >
                        Tuần
                    </button>
                    <button
                        type="button"
                        className={cn(
                            'rounded-e-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500',
                            calendar?.view === 'month'
                                ? 'z-10 bg-blue-100 text-blue-700 ring-1 ring-blue-400 '
                                : ''
                        )}
                        onClick={() => calendar?.setView('month')}
                    >
                        Tháng
                    </button>
                </div>
                <div className="ml-5 inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        className={cn(
                            'rounded-s-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500',
                            calendar?.mode === 'calendar'
                                ? 'z-10 bg-blue-100 text-blue-700 ring-1 ring-blue-400 '
                                : ''
                        )}
                        onClick={() => calendar?.setMode('calendar')}
                    >
                        <CalendarDays className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        className={cn(
                            'rounded-e-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500',
                            calendar?.mode === 'list'
                                ? 'z-10 bg-blue-100 text-blue-700 ring-1 ring-blue-400 '
                                : ''
                        )}
                        onClick={() => calendar?.setMode('list')}
                    >
                        <List className="h-4 w-4" />
                    </button>
                </div>
                <Select
                    onValueChange={(value) => calendar.setClinic(value)}
                    value={calendar.selectedClinicId ?? ''}
                    disabled={user?.roleId !== 1}
                >
                    <SelectTrigger className="ml-5 w-fit">
                        <SelectValue placeholder="Chọn phòng khám" />
                    </SelectTrigger>
                    <SelectContent>
                        {!isLoading ? (
                            clinics?.map((clinic: IClinic) => (
                                <SelectItem key={clinic.clinicId} value={clinic.clinicId}>
                                    {clinic.clinicName}
                                </SelectItem>
                            ))
                        ) : (
                            <div className="flex justify-center p-2">
                                <LoaderCircle className="animate-spin" />
                            </div>
                        )}
                    </SelectContent>
                </Select>
            </div>
        </header>
    );
}

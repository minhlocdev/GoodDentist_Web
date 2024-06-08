import {
    endOfMonth,
    endOfWeek,
    startOfMonth,
    startOfWeek,
    subDays
} from 'date-fns';
import { DateRange } from 'react-day-picker';
import { vi } from 'date-fns/locale';

export const handleTagClick = (tag: string) => {
    const today = new Date();
    let newDate: DateRange | undefined;
    let yesterday: Date | undefined;
    let lastWeekStart: Date | undefined;
    let lastWeekEnd: Date | undefined;
    let lastMonthStart: Date | undefined;
    let lastMonthEnd: Date | undefined;
    switch (tag) {
        case 'Hôm nay':
            newDate = { from: today, to: today };
            break;
        case 'Hôm qua':
            yesterday = subDays(today, 1);
            newDate = { from: yesterday, to: yesterday };
            break;
        case 'Tuần này':
            newDate = {
                from: startOfWeek(today, { locale: vi }),
                to: endOfWeek(today, { locale: vi })
            };
            break;
        case 'Tuần trước':
            lastWeekStart = startOfWeek(subDays(today, 7), { locale: vi });
            lastWeekEnd = endOfWeek(subDays(today, 7), { locale: vi });
            newDate = { from: lastWeekStart, to: lastWeekEnd };
            break;
        case '7 ngày trước':
            newDate = { from: subDays(today, 7), to: today };
            break;
        case 'Tháng này':
            newDate = { from: startOfMonth(today), to: endOfMonth(today) };
            break;
        case 'Tháng trước':
            lastMonthStart = startOfMonth(subDays(today, 30));
            lastMonthEnd = endOfMonth(subDays(today, 30));
            newDate = { from: lastMonthStart, to: lastMonthEnd };
            break;
        default:
            newDate = undefined;
    }
    return newDate;
};
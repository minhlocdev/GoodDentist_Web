'use client';

import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import { vi } from 'date-fns/locale';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { handleTagClick } from '../../lib/calendar-utils';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './pop-over';

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(Date.now()),
        to: addDays(new Date(Date.now()), 20)
    });

    const tags = [
        'Hôm nay',
        'Hôm qua',
        'Tuần này',
        'Tuần trước',
        '7 ngày trước',
        'Tháng này',
        'Tháng trước'
    ];

    console.log('date ', date);
    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'w-[250px] justify-start text-left font-normal',
                            !date && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, 'LLL dd, y')} -{' '}
                                    {format(date.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(date.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto max-w-[500px] p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        locale={vi}
                    />
                    <div className="w-full border-t border-neutral-200"></div>
                    <div className="flex flex-row flex-wrap gap-3 px-3 py-2">
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                className="w-fit cursor-pointer rounded-md bg-blue-200 px-2 text-sm font-light text-primary hover:bg-blue-100"
                                onClick={() => setDate(handleTagClick(tag))}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

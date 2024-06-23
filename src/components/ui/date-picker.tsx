'use client';

import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './pop-over';

interface DatePickerProps {
    value?: Date;
    onChange: (date: Date | undefined) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
    const [date, setDate] = React.useState<Date | undefined>(value);

    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate);
        onChange(newDate);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-[240px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                        format(date, 'EEEE', { locale: vi }) +
                        ', ' +
                        format(date, 'dd-MM-yyyy', { locale: vi })
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={date}
                    onSelect={handleDateChange}
                    initialFocus
                    locale={vi}
                    fromYear={1960}
                    toYear={2030}
                />
            </PopoverContent>
        </Popover>
    );
};

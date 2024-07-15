import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { useState } from 'react';
import { Input } from '../input';
import { ScrollArea } from '../scroll-area';

interface TimePickerPopoverProps {
    value: string;
    onChange: (value: string) => void;
    minTime?: string;
    maxTime?: string;
    step?: number;
}

const TimePickerPopover: React.FC<TimePickerPopoverProps> = ({
    value,
    onChange,
    minTime = '08:00',
    maxTime = '19:00',
    step = 900
}) => {
    const [selectedHour, setSelectedHour] = useState(parseInt(value.split(':')[0], 10));
    const [selectedMinute, setSelectedMinute] = useState(parseInt(value.split(':')[1], 10));

    const handleHourChange = (hour: number) => {
        const minute = 0;
        if (hour >= 8 && hour <= 19 && hour !== 12 && hour !== 13) {
            if (hour === 19) {
                setSelectedMinute(minute);
                onChange(
                    `${selectedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
                );
            }
            setSelectedHour(hour);
            onChange(
                `${hour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`
            );
        }
    };

    const handleMinuteChange = (minute: number) => {
        if (selectedHour < 19 || (selectedHour === 19 && minute === 0)) {
            setSelectedMinute(minute);
            onChange(
                `${selectedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
            );
        }
    };

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 4 }, (_, i) => i * 15);

    return (
        <Popover>
            <PopoverTrigger>
                <Input
                    type="time"
                    className="block w-full"
                    value={`${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`}
                    onChange={(event) => {
                        const [hour, minute] = event.target.value.split(':');
                        setSelectedHour(parseInt(hour, 10));
                        setSelectedMinute(parseInt(minute, 10));
                        onChange(event.target.value);
                    }}
                    min={minTime}
                    max={maxTime}
                    step={step.toString()}
                />
            </PopoverTrigger>
            <PopoverContent className="z-10 flex max-h-[300px] gap-x-2 bg-white p-2 shadow-md">
                <div className="flex flex-col items-center justify-between">
                    <span>Hour</span>
                    <ScrollArea className="h-full w-24">
                        {hours.map((hour) => (
                            <div
                                key={hour}
                                className={`rounded-sm px-4 py-2 hover:bg-gray-100 ${
                                    selectedHour === hour ? 'bg-gray-200' : ''
                                } ${hour < 8 || hour >= 20 || hour === 12 || hour === 13 ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'}`}
                                onClick={() => handleHourChange(hour)}
                            >
                                {hour.toString().padStart(2, '0')}
                            </div>
                        ))}
                    </ScrollArea>
                </div>
                <div className="flex flex-col items-center justify-between">
                    <span>Minute</span>
                    <ScrollArea className="h-full w-24">
                        {minutes.map((minute) => (
                            <div
                                key={minute}
                                className={`rounded-sm px-4 py-2 hover:bg-gray-100 ${
                                    selectedMinute === minute ? 'bg-gray-200' : ''
                                } ${selectedHour === 19 && minute > 0 ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'}`}
                                onClick={() => handleMinuteChange(minute)}
                            >
                                {minute.toString().padStart(2, '0')}
                            </div>
                        ))}
                    </ScrollArea>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default TimePickerPopover;

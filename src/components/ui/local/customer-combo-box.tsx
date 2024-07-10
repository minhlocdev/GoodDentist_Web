'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '../command';

const customers = [
    {
        value: 'next.js',
        label: 'Next.js'
    },
    {
        value: 'sveltekit',
        label: 'SvelteKit'
    },
    {
        value: 'nuxt.js',
        label: 'Nuxt.js'
    },
    {
        value: 'remix',
        label: 'Remix'
    },
    {
        value: 'astro',
        label: 'Astro'
    }
];

export function CustomerComboBox() {
    const [value, setValue] = React.useState('');

    return (
        <Command>
            <CommandInput placeholder="Tìm theo tên, số điện thoại..." />
            <CommandEmpty>Không có dữ liệu.</CommandEmpty>
            <CommandGroup>
                <CommandList>
                    {customers.map((customer) => (
                        <CommandItem
                            key={customer.value}
                            onSelect={(currentValue) => {
                                setValue(currentValue === value ? '' : currentValue);
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="#" alt="Avatar" />
                                    <AvatarFallback className="bg-transparent">JD</AvatarFallback>
                                </Avatar>
                                {customer.label}
                            </div>
                        </CommandItem>
                    ))}
                </CommandList>
            </CommandGroup>
        </Command>
    );
}

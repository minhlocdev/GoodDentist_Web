'use client';

import { ICustomer } from '../../../lib/interfaces/customer-types/ICustomer';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '../command';

interface CustomerComboBoxProps {
    customers?: ICustomer[];
    onSelect: (value: string) => void;
}

export function CustomerComboBox({ customers = [], onSelect }: CustomerComboBoxProps) {
    const handleSelect = (customer: ICustomer) => {
        onSelect(customer.userId);
    };
    return (
        <Command>
            <CommandInput placeholder="Tìm theo tên, số điện thoại..." />
            {customers.length === 0 ? (
                <CommandEmpty>Không có dữ liệu.</CommandEmpty>
            ) : (
                <CommandGroup>
                    <CommandList>
                        {customers.map((customer) => (
                            <CommandItem
                                key={customer.userId}
                                onSelect={() => handleSelect(customer)}
                            >
                                <div className="flex items-center justify-between">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={customer?.avatar as string}
                                            alt="Avatar"
                                        />
                                        <AvatarFallback className="bg-transparent">
                                            {customer?.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {customer?.name}
                                </div>
                            </CommandItem>
                        ))}
                    </CommandList>
                </CommandGroup>
            )}
        </Command>
    );
}

import { Info, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/pop-over';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../../../components/ui/select';

export const CustomTimeGutterHeader = () => (
    <div className="custom-rbc-time-header-gutter flex flex-col items-center justify-center gap-2 p-1">
        <Info className="h-[18px] w-[18px] text-neutral-600" />
        <Popover>
            <PopoverTrigger asChild>
                <Settings className="h-[18px] w-[18px] text-neutral-600" />
            </PopoverTrigger>
            <PopoverContent
                className="w-fit bg-slate-50 p-4 shadow-sm"
                side="right"
                align="start"
                sideOffset={10}
            >
                <div className="flex flex-col gap-3">
                    <p>Chọn khoảng thời gian muốn hiển thị:</p>
                    <div className="mt-2 flex items-center justify-between gap-x-3">
                        <span>Từ</span>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn giờ" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: 24 }, (_, i) => (
                                    <SelectItem key={i} value={i.toString()}>
                                        {i.toString().padStart(2, '0')}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <span>đến</span>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn giờ" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: 24 }, (_, i) => (
                                    <SelectItem key={i} value={i.toString()}>
                                        {i.toString().padStart(2, '0')}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <span>giờ</span>
                    </div>
                    <Button>Áp dụng</Button>
                </div>
            </PopoverContent>
        </Popover>
    </div>
);

interface CustomResourceProps {
    name: string;
    photo: string;
}

export const CustomResource: React.FC<CustomResourceProps> = ({ name, photo }) => {
    return (
        <div className="flex h-[100%] flex-1 items-center !justify-start gap-4 !bg-white pl-3">
            <div className="resource-photo">
                <Avatar className="h-10 w-10 rounded-full bg-slate-100">
                    <AvatarImage src={photo} alt="Avatar" />
                    <AvatarFallback className="bg-transparent text-neutral-600">
                        {name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="resource-name text-sm text-neutral-600">{name}</div>
        </div>
    );
};

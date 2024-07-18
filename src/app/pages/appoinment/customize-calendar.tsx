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
        <Popover>
            <PopoverTrigger asChild>
                <Info className="h-[18px] w-[18px] text-neutral-600" />
            </PopoverTrigger>
            <PopoverContent
                className="w-fit bg-neutral-800 bg-opacity-85 p-4 shadow-sm"
                side="right"
                align="start"
                sideOffset={10}
            >
                <div className="flex flex-col gap-1 text-white">
                    <div className="text-white">Màu sắc lịch hẹn:</div>
                    <div className="flex gap-x-4">
                        <div className="h-6 w-12 rounded-md bg-[#ffd54f]"></div>
                        <div className=""> : Khách hàng chưa đến</div>
                    </div>
                    <div className="flex gap-x-4">
                        <div className="h-6 w-12 rounded-md bg-[#9ee0b0]"></div>
                        <div className=""> : Khách hàng đã đến</div>
                    </div>
                    <div className="flex gap-x-4">
                        <div className="h-6 w-12 rounded-md bg-[#ffc266]"></div>
                        <div className=""> : Khách hàng đang điều trị</div>
                    </div>
                    <div className="flex gap-x-4">
                        <div className="h-6 w-12 rounded-md bg-[#a6a6a6]"></div>
                        <div className=""> : Khách hàng đã khám xong</div>
                    </div>
                    <div className="flex gap-x-4">
                        <div className="h-6 w-12 rounded-md bg-[#f08080]"></div>
                        <div className=""> : Lịch hẹn đã bị hủy</div>
                    </div>
                    <div className="flex gap-x-4">
                        <div className="h-6 w-12 rounded-md bg-[#7cd9e5]"></div>
                        <div className=""> : Khách hàng chưa đến</div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
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

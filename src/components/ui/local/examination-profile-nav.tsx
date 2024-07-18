import { ScrollArea } from '../scroll-area';
import { TabsList, TabsTrigger } from '../tab';
import { SheetMenu } from './sheet-menu';
import { UserNav } from './user-nav';

interface ExaminationProfileNavbarProps {
    title: string;
}

export function ExaminationProfileNavbar({ title }: ExaminationProfileNavbarProps) {
    return (
        <header className="sticky top-0 z-10 flex w-full flex-col bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="flex w-full items-center border-b border-neutral-400">
                <div className="mx-4 flex h-14 flex-1 items-center sm:mx-8">
                    <div className="flex flex-1 items-center space-x-4 lg:space-x-0">
                        <SheetMenu />
                        <h1 className="text-2xl font-bold">{title}</h1>
                    </div>
                    <div className="flex flex-1 items-center justify-end space-x-2">
                        <UserNav />
                    </div>
                </div>
            </div>
            <ScrollArea className="w-fit max-w-full overflow-x-auto whitespace-nowrap rounded-md">
                <div className="mx-4 flex items-center sm:mx-8">
                    <TabsList className="h-[calc(20px+2rem)] w-fit">
                        <TabsTrigger value="basicinfo">Thông tin khách hàng</TabsTrigger>
                        <TabsTrigger value="treatment">Khám và điều trị</TabsTrigger>
                        <TabsTrigger value="medicine">Đơn thuốc</TabsTrigger>
                        <TabsTrigger value="medical-record">Thư viện ảnh</TabsTrigger>
                        <TabsTrigger value="examination">Lịch hẹn</TabsTrigger>
                        <TabsTrigger value="payment">Thanh toán</TabsTrigger>
                    </TabsList>
                </div>
            </ScrollArea>
        </header>
    );
}

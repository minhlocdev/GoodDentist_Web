import { useState } from 'react';
import { Checkbox } from '../../../components/ui/checkbox';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '../../../components/ui/collapsible';
import { cn } from '../../../lib/utils';

const UserPermissionTable = () => {
    const [role, setRole] = useState(2);
    return (
        <div className="grid grid-cols-1 grid-rows-2 gap-x-3 gap-y-3 md:grid-cols-12">
            <div className="col-span-1 min-h-52 md:col-span-3">
                <div className="flex h-full flex-col border-[0.5px]">
                    <div className="bg-neutral-700 px-2 py-3 text-sm font-semibold text-white shadow-md">
                        Vai trò
                    </div>
                    <div
                        className={cn(
                            'cursor-pointer px-2 py-3 text-sm font-semibold transition-all hover:bg-neutral-100',
                            role === 2 ? 'bg-neutral-50 text-primary' : ''
                        )}
                        onClick={() => setRole(2)}
                    >
                        Bác sỹ
                    </div>
                    <div
                        className={cn(
                            'cursor-pointer px-2 py-3 text-sm font-semibold transition-all hover:bg-neutral-100',
                            role === 3 ? 'bg-neutral-50 text-primary' : ''
                        )}
                        onClick={() => setRole(3)}
                    >
                        Nhân viên
                    </div>
                </div>
            </div>
            <div className="col-span-1 min-h-52 border-[0.5px] md:col-span-9">
                <div
                    id="header"
                    className="grid grid-cols-9 bg-neutral-700 px-2 py-3 text-center text-sm font-semibold text-white"
                >
                    <div className="col-span-5 text-left">Chức năng</div>
                    <div className="col-span-1 border-s-2 border-white">Xem</div>
                    <div className="col-span-1 border-s-2 border-white">Thêm</div>
                    <div className="col-span-1 border-s-2 border-white">Sửa</div>
                    <div className="col-span-1 border-s-2 border-white">Xóa</div>
                </div>
                <Collapsible>
                    <CollapsibleTrigger className="px-2 py-3 w-full col-span-9 text-left bg-neutral-200 border border-neutral-300 hover:bg-blue-200 cursor-pointer transition-colors">
                        Trang chủ
                    </CollapsibleTrigger>
                    <CollapsibleContent className="grid w-full grid-cols-9 text-center">
                        <div className="col-span-5 ps-10 text-left flex items-center">Trang chủ</div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2 ">
                            <Checkbox />
                        </div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2">
                            <Checkbox />
                        </div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2">
                            <Checkbox />
                        </div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2">
                            <Checkbox />
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                    <CollapsibleTrigger className="px-2 py-3 w-full col-span-9 text-left bg-neutral-200 border border-neutral-300 hover:bg-blue-200 cursor-pointer transition-colors">
                        Quản lý khách hàng
                    </CollapsibleTrigger>
                    <CollapsibleContent className="grid w-full grid-cols-9 text-center">
                        <div className="col-span-5 ps-10 text-left flex items-center">Trang chủ</div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2 ">
                            <Checkbox />
                        </div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2">
                            <Checkbox />
                        </div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2">
                            <Checkbox />
                        </div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2">
                            <Checkbox />
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                    <CollapsibleTrigger className="px-2 py-3 w-full col-span-9 text-left bg-neutral-200 border border-neutral-300 hover:bg-blue-200 cursor-pointer transition-colors">
                        Quản lý lịch hẹn
                    </CollapsibleTrigger>
                    <CollapsibleContent className="grid w-full grid-cols-9 text-center">
                        <div className="col-span-5 ps-10 text-left flex items-center">Trang chủ</div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2 ">
                            <Checkbox />
                        </div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2">
                            <Checkbox />
                        </div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2">
                            <Checkbox />
                        </div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2">
                            <Checkbox />
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                    <CollapsibleTrigger className="px-2 py-3 w-full col-span-9 text-left bg-neutral-200 border border-neutral-300 hover:bg-blue-200 cursor-pointer transition-colors">
                        Quản lý kho
                    </CollapsibleTrigger>
                    <CollapsibleContent className="grid w-full grid-cols-9 text-center">
                        <div className="col-span-5 ps-10 text-left flex items-center">Trang chủ</div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2 ">
                            <Checkbox />
                        </div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2">
                            <Checkbox />
                        </div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2">
                            <Checkbox />
                        </div>
                        <div className="col-span-1 border-s-2 border-neutral-300 py-2">
                            <Checkbox />
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    );
};

export default UserPermissionTable;

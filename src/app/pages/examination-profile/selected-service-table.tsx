import { AxiosError } from 'axios';
import { LoaderCircle, Trash } from 'lucide-react';
import React, { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import { DialogClose, DialogFooter } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { ScrollArea } from '../../../components/ui/scroll-area';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../../../components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '../../../components/ui/tooltip';
import { useExaminationStore } from '../../../hooks/use-examination-store';
import { IPostOrder } from '../../../lib/interfaces/order-types/IPostOrder';
import { IPutOrder } from '../../../lib/interfaces/order-types/IPutOrder';
import { IService } from '../../../lib/interfaces/services-types/IService';
import { PaymentStatus } from '../../../lib/payment-status';
import { queryClient } from '../../../lib/queryClient';
import { orderService } from '../../../services/queries/orderQuery';

const SelectServiceTable = () => {
    const {
        selectedOrder,
        orders,
        allServices,
        setAllServices,
        selectedServices,
        setSelectedServices,
        selectedExamination,
        setSelectedExamination
    } = useExaminationStore();

    useEffect(() => {
        const currentService = selectedOrder?.orderServices?.flatMap((orderService) =>
            orderService.service
                ? [
                      {
                          ...orderService.service,
                          quantity: orderService.quantity,
                          status: orderService.status
                      }
                  ]
                : []
        );

        const newSelectedService = selectedServices?.map((service) => ({
            ...service,
            status: 1
        }));
        const services = currentService?.filter((curr) =>
            newSelectedService?.map((selectService) => curr.serviceId !== selectService.serviceId)
        );

        const tmpServices: IService[] = [...(services ?? []), ...(newSelectedService ?? [])];

        setAllServices(tmpServices);
    }, [selectedOrder?.orderServices, selectedServices, setAllServices]);

    const postOrder = orderService.PostOrder();
    const putOrder = orderService.PutOrder();
    const handleQuantityChange = (id: number, value: number) => {
        setAllServices(
            allServices!.map((service) =>
                service.status === 1 && service.serviceId === id
                    ? { ...service, quantity: value }
                    : service
            )
        );
    };

    const handleDeleteService = (id: number) => {
        setSelectedServices(selectedServices!.filter((service) => service.serviceId !== id));
    };
    const totalPrice = useMemo(() => {
        return allServices!.reduce((total, service) => {
            const quantity = service?.quantity ?? 1;
            return total + service.price! * quantity;
        }, 0);
    }, [allServices]);

    const onPostOrder = async () => {
        const updatedServices = selectedServices!.map((service) => ({
            ...service,
            status: 1
        }));
        const newPostOrder: IPostOrder = {
            orderName: `Order for Examination ${selectedExamination?.examinationId}`,
            examinationId: selectedExamination?.examinationId,
            dateTime: new Date(),
            price: 0,
            status: true,
            services: updatedServices
        };
        await postOrder.mutateAsync(newPostOrder, {
            onSuccess: async (res) => {
                if (res.isSuccess) {
                    toast.success('Tạo mới thành công');
                    await queryClient.refetchQueries({ queryKey: ['examination-profile'] });
                    setSelectedServices([]);
                } else {
                    toast.error('Tạo mới thất bại' + res.message);
                    setSelectedServices([]);
                }
            },
            onError: (error) => {
                if (error instanceof AxiosError && error.response?.data?.statusCode === 400) {
                    toast.error(error.response.data.message[0] as React.ReactNode);
                } else {
                    toast.error('Tạo mới thất bại');
                }
            }
        });
    };
    const onPutOrder = async () => {
        const updatedServices = allServices!.map((service) => ({
            ...service,
            status: 1
        }));
        const newPutOrder: IPutOrder = {
            orderId: selectedOrder!.orderId,
            orderName: `Order for Examination ${selectedExamination?.examinationId}`,
            examinationId: selectedExamination?.examinationId,
            dateTime: new Date(),
            price: 0,
            status: true,
            services: updatedServices
        };
        await putOrder.mutateAsync(newPutOrder, {
            onSuccess: async (res) => {
                if (res.isSuccess) {
                    toast.success('Cập nhật thành công');
                    await queryClient.refetchQueries({ queryKey: ['examination-profile'] });
                } else {
                    toast.error('Cập nhật thất bại' + res.message);
                }
            },
            onError: (error) => {
                if (error instanceof AxiosError && error.response?.data?.statusCode === 400) {
                    toast.error(error.response.data.message[0] as React.ReactNode);
                } else {
                    toast.error('Tạo mới thất bại');
                }
            }
        });
    };

    console.log('all', allServices);
    console.log('select', selectedServices);
    return (
        <div className="flex flex-col items-center gap-x-3 ">
            <div className="flex w-full flex-1 flex-col gap-y-3 py-4 ">
                <div className="w-full flex-1 rounded-md border">
                    <ScrollArea className="h-64 max-h-80 min-h-32">
                        <Table>
                            <TableHeader className="bg-neutral-600/90">
                                <TableRow>
                                    <TableHead className="text-white">Mã dịch vụ</TableHead>
                                    <TableHead className="text-white">Tên dịch vụ</TableHead>
                                    <TableHead className="text-white">Đơn giá</TableHead>
                                    <TableHead className="text-white">Số lượng</TableHead>
                                    <TableHead className="text-white">Nội dung khám</TableHead>
                                    <TableHead className="text-white">Tình trạng</TableHead>
                                    <TableHead className="text-white">Thao tác</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allServices?.length !== 0 ? (
                                    allServices?.map((service) => (
                                        <TableRow key={service.serviceId}>
                                            <TableCell className="max-w-full truncate">
                                                {service.serviceId}
                                            </TableCell>
                                            <TableCell className="max-w-full truncate">
                                                {service.serviceName}
                                            </TableCell>
                                            <TableCell className="max-w-full truncate">
                                                {service.price}
                                            </TableCell>
                                            <TableCell className="max-w-full truncate">
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    max={99}
                                                    className="rounded border px-2 py-1"
                                                    value={service.quantity ?? 1}
                                                    onChange={(e) =>
                                                        handleQuantityChange(
                                                            service.serviceId,
                                                            Number(e.target.value)
                                                        )
                                                    }
                                                    disabled={service.status !== 1}
                                                />
                                            </TableCell>
                                            <TableCell className="max-w-full truncate">
                                                {service.description}
                                            </TableCell>
                                            <TableCell className="max-w-full truncate">
                                                {PaymentStatus[service.status as number]}
                                            </TableCell>
                                            <TableCell className="max-w-full truncate">
                                                {service.status === 1 && (
                                                    <div className="flex gap-x-1">
                                                        <TooltipProvider>
                                                            <Tooltip delayDuration={100}>
                                                                <TooltipTrigger>
                                                                    <Trash
                                                                        className="h-5 w-5 cursor-pointer text-destructive"
                                                                        onClick={() =>
                                                                            handleDeleteService(
                                                                                service.serviceId
                                                                            )
                                                                        }
                                                                    />
                                                                </TooltipTrigger>
                                                                <TooltipContent side="bottom">
                                                                    <p>Bỏ chọn</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
                <div className="flex items-center gap-x-3">
                    <div className="text-sm font-semibold">Tổng chi phí dự kiến:</div>
                    <div className="">{totalPrice}đ</div>
                </div>
            </div>

            <DialogFooter className="flex w-full flex-row justify-between border-t border-neutral-300 p-5">
                <Button
                    type="submit"
                    className="flex-1"
                    onClick={async () => {
                        orders ? await onPutOrder() : await onPostOrder();
                    }}
                    disabled={postOrder.isPending}
                >
                    {postOrder.isPending ? (
                        <LoaderCircle className="animate-spin" />
                    ) : !orders ? (
                        'Lưu thông tin'
                    ) : (
                        'Cập nhật'
                    )}
                </Button>
                <DialogClose className="flex-1">
                    <Button
                        variant={'secondary'}
                        className="w-full hover:bg-neutral-200"
                        onClick={() => {
                            setSelectedServices([]), setSelectedExamination(null);
                        }}
                    >
                        Hủy bỏ
                    </Button>
                </DialogClose>
            </DialogFooter>
        </div>
    );
};

export default SelectServiceTable;

import { format } from 'date-fns';
import React from 'react';
import { Button } from '../../../components/ui/button';
import { IExaminationProfile } from '../../../lib/interfaces/others/IExaminationProfile';
import { TreatmentModal } from './treatment-modal';

interface OrderServicesTableProps {
    examinations: IExaminationProfile['examinations'];
}

const TreatOrderTable = ({ examinations }: OrderServicesTableProps) => {
    return (
        <table className="min-w-full rounded-md border border-gray-200 bg-white shadow-lg">
            <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-gray-600">Tên dịch vụ</th>
                    <th className="px-4 py-2 text-left text-gray-600">Ngày tạo</th>
                    <th className="px-4 py-2 text-left text-gray-600">SL</th>
                    <th className="px-4 py-2 text-left text-gray-600">Giá dịch vụ</th>
                    <th className="px-4 py-2 text-left text-gray-600">Thành tiền</th>
                    <th className="px-4 py-2 text-left text-gray-600">Tình trạng</th>
                </tr>
            </thead>
            <tbody>
                {examinations?.map((ex) =>
                    ex?.orders?.map((order) => (
                        <React.Fragment key={ex.examinationId}>
                            <tr className="bg-gray-200">
                                <td colSpan={7} className="px-4 py-2 text-center font-bold">
                                    <div className="flex w-full items-center justify-between">
                                        <span>
                                            Mã: {order.orderId} - {order.orderName}
                                        </span>
                                        <TreatmentModal examination={ex} order={order} />
                                    </div>
                                </td>
                            </tr>
                            {order?.orderServices?.map((orderservice, serviceIndex) => (
                                <tr
                                    key={orderservice.orderServiceId}
                                    className={serviceIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                >
                                    <td className="border-t px-4 py-2">
                                        {orderservice.service?.serviceName}
                                    </td>
                                    <td className="border-t px-4 py-2">
                                        {format(order.dateTime!, 'dd-MM-yyyy')}
                                    </td>
                                    <td className="border-t px-4 py-2">{orderservice.quantity}</td>
                                    <td className="border-t px-4 py-2">
                                        {orderservice.service?.price}đ
                                    </td>
                                    <td className="border-t px-4 py-2">{orderservice.price}đ</td>
                                    <td className="border-t px-4 py-2">
                                        {orderservice.status === 0 ? (
                                            <div className="rounded-md bg-green-500 px-2 py-1 text-center text-white">
                                                Hoàn thành
                                            </div>
                                        ) : (
                                            <Button variant={'link'} className="text-primary">
                                                Chưa thanh toán
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default TreatOrderTable;

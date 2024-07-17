import { UseQueryResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../../../components/ui/table';
import { IClinic } from '../../../lib/interfaces/clinics-types/IClinic';
import { IService } from '../../../lib/interfaces/services-types/IService';
import { cn } from '../../../lib/utils';
import { clinicService } from '../../../services/queries/clinicQuery';
import { serviceService } from '../../../services/queries/serviceQuery';

const ClinicServiceDataTable = () => {
    const [clinicId, setClinicId] = useState<string>('');
    const { data: clinics }: UseQueryResult<IClinic[]> = clinicService.GetClinics();
    const { data: services }: UseQueryResult<IService[]> = serviceService.GetAllServices();
    const { data: clinicServices }: UseQueryResult<IService[]> =
        serviceService.GetAllServicesByClinicId(clinicId);

    useEffect(() => {
        if (clinics && clinics.length > 0) {
            setClinicId(clinics[0].clinicId);
        }
    }, [clinics]);

    return (
        <div className="grid grid-cols-1 grid-rows-2 gap-x-3 gap-y-3 md:grid-cols-12">
            <div className="col-span-1 min-h-52 md:col-span-3">
                <div className="flex h-full flex-col border-[0.5px]">
                    <div className="bg-neutral-700 px-2 py-3 text-sm font-semibold text-white shadow-md">
                        Phòng khám
                    </div>
                    {clinics &&
                        clinics.map((clinic) => (
                            <div
                                key={clinic.clinicId}
                                className={cn(
                                    'cursor-pointer px-2 py-3 text-sm font-semibold transition-all hover:bg-neutral-100',
                                    clinicId === clinic.clinicId ? 'bg-neutral-50 text-primary' : ''
                                )}
                                onClick={() => setClinicId(clinic.clinicId)}
                            >
                                {clinic.clinicName}
                            </div>
                        ))}
                </div>
            </div>
            <div className="col-span-1 min-h-52 border-[0.5px] md:col-span-9">
                <Table>
                    <TableHeader className="bg-neutral-700 text-center text-sm font-semibold">
                        <TableRow>
                            <TableHead className="w-2/4 text-white">Dịch vụ</TableHead>
                            <TableHead className="w-1/4 text-white">Giá</TableHead>
                            <TableHead className="w-1/4 text-white">Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services &&
                            services.map((service) => {
                                const isServiceInClinic = clinicServices?.some(
                                    (clinicService) => clinicService.serviceId === service.serviceId
                                );
                                return (
                                    <TableRow key={service.serviceId}>
                                        <TableCell className="w-2/4">
                                            {service.serviceName}
                                        </TableCell>
                                        <TableCell className="w-1/4">{service.price}</TableCell>
                                        <TableCell className="w-1/4">
                                            {isServiceInClinic ? (
                                                <>
                                                    <Button className="mr-2 bg-blue-500">
                                                        Update
                                                    </Button>
                                                    <Button className="bg-red-500">Delete</Button>
                                                </>
                                            ) : (
                                                <Button className="bg-green-500">Add</Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ClinicServiceDataTable;

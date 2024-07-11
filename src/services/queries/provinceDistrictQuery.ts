import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getDistrict, getProvince } from '../province-district';

export const provinceDistrictService = {
    GetProvince: () =>
        useQuery({
            queryKey: ['provinces'],
            queryFn: async () => {
                return await getProvince();
            },
            staleTime: 20000,
            placeholderData: keepPreviousData
        }),

    GetDistrict: (provinceName: string) =>
        useQuery({
            queryKey: ['districts'],
            queryFn: async () => {
                return await getDistrict(provinceName);
            },
            enabled: !!provinceName,
            staleTime: 20000,
            placeholderData: keepPreviousData
        })
};

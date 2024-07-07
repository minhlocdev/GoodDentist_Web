import { UseQueryResult, keepPreviousData, useQuery } from "@tanstack/react-query";
import { IClinicService } from "../../lib/interfaces/clinics-types/IClinicService";
import { IClinic } from "../../lib/interfaces/clinics-types/IClinic";
import { getClinics } from "../clinics";

export const clinicService: IClinicService = {
    GetClinics: (): UseQueryResult<IClinic[]> => {
        return useQuery<IClinic[], Error>({
            queryKey: ['clinics'],
            queryFn: async (): Promise<IClinic[]> => {
                const response = await getClinics();
                return response.data.result;
            },
            staleTime: 20000,
            placeholderData: keepPreviousData
        });
    }
};
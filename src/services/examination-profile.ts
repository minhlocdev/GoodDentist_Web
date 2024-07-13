import { AxiosResponse } from "axios";
import { ApiResponse } from "../lib/api";
import { IExaminationProfile } from "../lib/interfaces/others/IExaminationProfile";
import apiClient from "./api-client";

export const getExaminationProfileByCustomer = async (
    customerId: string
): Promise<AxiosResponse<ApiResponse<IExaminationProfile[]>>> => {
    return await apiClient({
        method: 'get',
        url: `/examination-profiles/customer-id`,
        params: {
            customerId
        }
    });
};
import { AxiosResponse } from "axios";
import { ApiResponse } from "../lib/api";
import apiClient from "./api-client";
import { IExamination } from "../lib/interfaces/examination-types/IExamination";

export const getExaminationsByClinic = async (
    clinicId:string,
    pageNumber: number,
    rowsPerPage: number,
    filterField?: string,
    filterValue?: string,
    sortField?: string,
    sortOrder?: string
): Promise<AxiosResponse<ApiResponse<IExamination[]>>> => {
    return await apiClient({
        method: 'get',
        url: `/api/examinations/all-examinations-of-clinic`,
        params: {
            clinicId,
            pageNumber,
            rowsPerPage,
            filterField,
            filterValue,
            sortField,
            sortOrder
        }
    });
};
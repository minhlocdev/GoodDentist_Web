import { AxiosResponse } from 'axios';
import { ApiResponse } from '../lib/api';
import { IExamination } from '../lib/interfaces/examination-types/IExamination';
import { IPostExamination } from '../lib/interfaces/examination-types/IPostExamination';
import apiClient from './api-client';

export const getExaminationsByClinic = async (
    clinicId: string,
    pageNumber: number,
    rowsPerPage: number,
    filterField?: string,
    filterValue?: string,
    sortField?: string,
    sortOrder?: string
): Promise<AxiosResponse<ApiResponse<IExamination[]>>> => {
    return await apiClient({
        method: 'get',
        url: `/api/examinations/clinic`,
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

export const getExamination = async (
    examId: number
): Promise<AxiosResponse<ApiResponse<IExamination>>> => {
    return await apiClient({
        method: 'get',
        url: `/api/examinations/examination/detail`,
        params: {
            examId
        }
    });
};

export const postExamination = async (
    examination: IPostExamination
): Promise<AxiosResponse<ApiResponse<IPostExamination>>> => {
    return await apiClient({
        method: 'post',
        url: `/api/examinations/examination`,
        data: examination,
        params: {
            mode: examination.mode,
            customerId: examination.customerId
        }
    });
};

export const putExamination = async (
    examination: IPostExamination
): Promise<AxiosResponse<ApiResponse<string>>> => {
    return await apiClient({
        method: 'put',
        url: `/api/examinations/examination`,
        data: examination
    });
};

import { UseQueryResult } from '@tanstack/react-query';
import { IClinic } from './IClinic';

export interface IClinicService {
    GetClinics: () => UseQueryResult<IClinic[]>;
}

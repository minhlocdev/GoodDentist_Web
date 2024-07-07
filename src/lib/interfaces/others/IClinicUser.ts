import { IClinic } from "../clinics-types/IClinic";
import { IUser } from "../user-types/IUser";

export default interface ICLinicUser {
    clinicUserId: string,
    userId: IUser["id"],
    clinicId: IClinic["clinic_id"],
    status: number,
}
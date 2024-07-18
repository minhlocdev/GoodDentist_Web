import { create } from 'zustand';
import { IExamination } from '../lib/interfaces/examination-types/IExamination';
import { IOrder } from '../lib/interfaces/order-types/IOrder';
import { IExaminationProfile } from '../lib/interfaces/others/IExaminationProfile';
import { IService } from '../lib/interfaces/services-types/IService';

interface useExaminationStoreProps {
    examProfilesData: IExaminationProfile[] | null;
    allServices: IService[] | null;
    selectedServices: IService[] | null;
    orders: IOrder[] | null;
    selectedOrder: IOrder | null;
    selectedExamination: IExamination | null;
    setAllServices: (newServices: IService[]) => void;
    setSelectedServices: (newServices: IService[]) => void;
    setOrders: (newOrders: IOrder[]) => void;
    setSelectedOrder: (newOrders: IOrder) => void;
    setSelectedExamination: (newExamination: IExamination | null) => void;
    setExamProfilesData: (newExamProfilesData: IExaminationProfile[]) => void;
}

export const useExaminationStore = create<useExaminationStoreProps>((set) => ({
    examProfilesData: null,
    allServices: [],
    selectedServices: [],
    orders: null,
    selectedOrder: null,
    selectedExamination: null,
    setAllServices: (newServices) => set({ allServices: [...newServices] }),
    setSelectedServices: (newServices) => set({ selectedServices: newServices }),
    setOrders: (newOrders) => set({ orders: newOrders }),
    setSelectedOrder: (newOrders) => set({ selectedOrder: newOrders }),
    setSelectedExamination: (newExamination) => set({ selectedExamination: newExamination }),
    setExamProfilesData: (newExamProfilesData) => set({ examProfilesData: newExamProfilesData })
}));

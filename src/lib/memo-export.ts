import { memo } from 'react';
import CollapseAppointment from '../app/pages/appoinment/collapsible-appointment';
import CollapseInfo from '../app/pages/appoinment/collapsible-info';
import CollapsePayment from '../app/pages/appoinment/collapsible-payment';
import CollapseTreatment from '../app/pages/appoinment/collapsible-treatment';
import CollapseMedicine from '../app/pages/appoinment/collasible-medicine';

export const MemoizedCollapseInfo = memo(CollapseInfo, (prevProps, nextProps) => {
    return prevProps.examProfile === nextProps.examProfile;
});

export const MemoizedCollapseAppointment = memo(CollapseAppointment, (prevProps, nextProps) => {
    return prevProps.examProfile === nextProps.examProfile;
});

export const MemoizedCollapseMedicine = memo(CollapseMedicine, (prevProps, nextProps) => {
    return prevProps.examProfile === nextProps.examProfile;
});

export const MemoizedCollapsePayment = memo(CollapsePayment, (prevProps, nextProps) => {
    return prevProps.examProfile === nextProps.examProfile;
});

export const MemoizedCollapseTreatment = memo(CollapseTreatment, (prevProps, nextProps) => {
    return prevProps.examProfile === nextProps.examProfile;
});
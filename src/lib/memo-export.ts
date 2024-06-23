import { memo } from 'react';
import CollapseAppointment from '../app/pages/appoinment/collapsible-appoinment';
import CollapseInfo from '../app/pages/appoinment/collapsible-info';
import CollapsePayment from '../app/pages/appoinment/collapsible-payment';
import CollapseTreatment from '../app/pages/appoinment/collapsible-treatment';
import CollapseMedicine from '../app/pages/appoinment/collasible-medicine';

export const MemoizedCollapseInfo = memo(CollapseInfo);
export const MemoizedCollapseAppointment = memo(CollapseAppointment);
export const MemoizedCollapseMedicine = memo(CollapseMedicine);
export const MemoizedCollapsePayment = memo(CollapsePayment);
export const MemoizedCollapseTreatment = memo(CollapseTreatment);
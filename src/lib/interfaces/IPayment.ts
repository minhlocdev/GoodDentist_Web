export default interface IPayment {
    id: string;
    amount: number;
    method: string;
}

export const payments: IPayment[] = [
    {
        id: '728ed52f',
        amount: 25550000,
        method: 'CHỈNH NHA CỐ ĐỊNH'
    },
    {
        id: '489e1d42',
        amount: 500000,
        method: 'KHÁM TỔNG QUÁT'
    },
    {
        id: '489e1d42',
        amount: 0,
        method: 'TÁI KHÁM'
    },
    {
        id: '489e1d42',
        amount: 0,
        method: 'KHÁC'
    }
];

import { IRole } from './IRole';

export interface IUser {
    id: number;
    user_name: string;
    password?: string;
    dob?: Date;
    gender?: 'Male' | 'Female' | 'Other';
    phone_number?: string;
    email?: string;
    address?: string;
    status?: number;
    role?: IRole;
}
const users: IUser[] = [
    {
        id: 1,
        user_name: 'johndoe',
        password: 'password123',
        dob: new Date('1990-01-01'),
        gender: 'Male',
        phone_number: '123-456-7890',
        email: 'johndoe@example.com',
        address: '123 Main St, City, Country',
        status: 1,
        role: { id: 1, name: 'Admin', description: 'Administrator role' }
    },
    {
        id: 2,
        user_name: 'janedoe',
        password: 'password123',
        dob: new Date('1992-02-02'),
        gender: 'Female',
        phone_number: '123-456-7891',
        email: 'janedoe@example.com',
        address: '124 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 3,
        user_name: 'alice',
        password: 'password123',
        dob: new Date('1985-03-03'),
        gender: 'Female',
        phone_number: '123-456-7892',
        email: 'alice@example.com',
        address: '125 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 4,
        user_name: 'bob',
        password: 'password123',
        dob: new Date('1980-04-04'),
        gender: 'Male',
        phone_number: '123-456-7893',
        email: 'bob@example.com',
        address: '126 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 5,
        user_name: 'charlie',
        password: 'password123',
        dob: new Date('1975-05-05'),
        gender: 'Male',
        phone_number: '123-456-7894',
        email: 'charlie@example.com',
        address: '127 Main St, City, Country',
        status: 1,
        role: { id: 3, name: 'Manager', description: 'Manager role' }
    },
    {
        id: 6,
        user_name: 'david',
        password: 'password123',
        dob: new Date('1988-06-06'),
        gender: 'Male',
        phone_number: '123-456-7895',
        email: 'david@example.com',
        address: '128 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 7,
        user_name: 'eve',
        password: 'password123',
        dob: new Date('1983-07-07'),
        gender: 'Female',
        phone_number: '123-456-7896',
        email: 'eve@example.com',
        address: '129 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 8,
        user_name: 'frank',
        password: 'password123',
        dob: new Date('1978-08-08'),
        gender: 'Male',
        phone_number: '123-456-7897',
        email: 'frank@example.com',
        address: '130 Main St, City, Country',
        status: 1,
        role: { id: 3, name: 'Manager', description: 'Manager role' }
    },
    {
        id: 9,
        user_name: 'grace',
        password: 'password123',
        dob: new Date('1995-09-09'),
        gender: 'Female',
        phone_number: '123-456-7898',
        email: 'grace@example.com',
        address: '131 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 10,
        user_name: 'henry',
        password: 'password123',
        dob: new Date('1990-10-10'),
        gender: 'Male',
        phone_number: '123-456-7899',
        email: 'henry@example.com',
        address: '132 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 11,
        user_name: 'isabel',
        password: 'password123',
        dob: new Date('1987-11-11'),
        gender: 'Female',
        phone_number: '123-456-7800',
        email: 'isabel@example.com',
        address: '133 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 12,
        user_name: 'jack',
        password: 'password123',
        dob: new Date('1982-12-12'),
        gender: 'Male',
        phone_number: '123-456-7801',
        email: 'jack@example.com',
        address: '134 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 13,
        user_name: 'kate',
        password: 'password123',
        dob: new Date('1981-01-13'),
        gender: 'Female',
        phone_number: '123-456-7802',
        email: 'kate@example.com',
        address: '135 Main St, City, Country',
        status: 1,
        role: { id: 3, name: 'Manager', description: 'Manager role' }
    },
    {
        id: 14,
        user_name: 'leo',
        password: 'password123',
        dob: new Date('1993-02-14'),
        gender: 'Male',
        phone_number: '123-456-7803',
        email: 'leo@example.com',
        address: '136 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 15,
        user_name: 'mary',
        password: 'password123',
        dob: new Date('1996-03-15'),
        gender: 'Female',
        phone_number: '123-456-7804',
        email: 'mary@example.com',
        address: '137 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 16,
        user_name: 'nick',
        password: 'password123',
        dob: new Date('1989-04-16'),
        gender: 'Male',
        phone_number: '123-456-7805',
        email: 'nick@example.com',
        address: '138 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 17,
        user_name: 'olivia',
        password: 'password123',
        dob: new Date('1984-05-17'),
        gender: 'Female',
        phone_number: '123-456-7806',
        email: 'olivia@example.com',
        address: '139 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 18,
        user_name: 'peter',
        password: 'password123',
        dob: new Date('1979-06-18'),
        gender: 'Male',
        phone_number: '123-456-7807',
        email: 'peter@example.com',
        address: '140 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 19,
        user_name: 'quinn',
        password: 'password123',
        dob: new Date('1994-07-19'),
        gender: 'Male',
        phone_number: '123-456-7808',
        email: 'quinn@example.com',
        address: '141 Main St, City, Country',
        status: 1,
        role: { id: 3, name: 'Manager', description: 'Manager role' }
    },
    {
        id: 20,
        user_name: 'rachel',
        password: 'password123',
        dob: new Date('1991-08-20'),
        gender: 'Female',
        phone_number: '123-456-7809',
        email: 'rachel@example.com',
        address: '142 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 21,
        user_name: 'sam',
        password: 'password123',
        dob: new Date('1986-09-21'),
        gender: 'Male',
        phone_number: '123-456-7810',
        email: 'sam@example.com',
        address: '143 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 22,
        user_name: 'tina',
        password: 'password123',
        dob: new Date('1981-10-22'),
        gender: 'Female',
        phone_number: '123-456-7811',
        email: 'tina@example.com',
        address: '144 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 23,
        user_name: 'uma',
        password: 'password123',
        dob: new Date('1993-11-23'),
        gender: 'Female',
        phone_number: '123-456-7812',
        email: 'uma@example.com',
        address: '145 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 24,
        user_name: 'victor',
        password: 'password123',
        dob: new Date('1978-12-24'),
        gender: 'Male',
        phone_number: '123-456-7813',
        email: 'victor@example.com',
        address: '146 Main St, City, Country',
        status: 1,
        role: { id: 3, name: 'Manager', description: 'Manager role' }
    },
    {
        id: 25,
        user_name: 'wendy',
        password: 'password123',
        dob: new Date('1985-01-25'),
        gender: 'Female',
        phone_number: '123-456-7814',
        email: 'wendy@example.com',
        address: '147 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 26,
        user_name: 'xander',
        password: 'password123',
        dob: new Date('1990-02-26'),
        gender: 'Male',
        phone_number: '123-456-7815',
        email: 'xander@example.com',
        address: '148 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 27,
        user_name: 'yvonne',
        password: 'password123',
        dob: new Date('1995-03-27'),
        gender: 'Female',
        phone_number: '123-456-7816',
        email: 'yvonne@example.com',
        address: '149 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 28,
        user_name: 'zach',
        password: 'password123',
        dob: new Date('1984-04-28'),
        gender: 'Male',
        phone_number: '123-456-7817',
        email: 'zach@example.com',
        address: '150 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 29,
        user_name: 'amelia',
        password: 'password123',
        dob: new Date('1987-05-29'),
        gender: 'Female',
        phone_number: '123-456-7818',
        email: 'amelia@example.com',
        address: '151 Main St, City, Country',
        status: 1,
        role: { id: 2, name: 'User', description: 'Regular user role' }
    },
    {
        id: 30,
        user_name: 'brian',
        password: 'password123',
        dob: new Date('1982-06-30'),
        gender: 'Male',
        phone_number: '123-456-7819',
        email: 'brian@example.com',
        address: '152 Main St, City, Country',
        status: 1,
        role: { id: 3, name: 'Manager', description: 'Manager role' }
    }
];

export default users;

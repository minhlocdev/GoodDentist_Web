import { IUser } from './IUser';

export interface ICustomer extends IUser {
    examination_id?: string;
    clinic_id?: string;
    front_id_card?: string;
    back_id_card?: string;
}
export const customers: ICustomer[] = [
    {
        id: 1,
        user_name: 'JohnDoe',
        password: 'password123',
        dob: new Date('1990-01-01'),
        gender: 'Male',
        phone_number: '1234567890',
        email: 'john.doe@example.com',
        address: '123 Main St',
        status: 1,
        examination_id: 'EX123456',
        clinic_id: 'CL123456'
    },
    {
        id: 2,
        user_name: 'JaneSmith',
        password: 'password123',
        dob: new Date('1985-02-02'),
        gender: 'Female',
        phone_number: '0987654321',
        email: 'jane.smith@example.com',
        address: '456 Oak St',
        status: 1,
        examination_id: 'EX654321',
        clinic_id: 'CL654321'
    },
    {
        id: 3,
        user_name: 'AliceJohnson',
        password: 'password123',
        dob: new Date('1970-03-03'),
        gender: 'Female',
        phone_number: '1231231234',
        email: 'alice.johnson@example.com',
        address: '789 Pine St',
        status: 1,
        examination_id: 'EX111222',
        clinic_id: 'CL111222'
    },
    {
        id: 4,
        user_name: 'BobBrown',
        password: 'password123',
        dob: new Date('1965-04-04'),
        gender: 'Male',
        phone_number: '3213214321',
        email: 'bob.brown@example.com',
        address: '101 Maple St',
        status: 1,
        examination_id: 'EX333444',
        clinic_id: 'CL333444'
    },
    {
        id: 5,
        user_name: 'CharlieDavis',
        password: 'password123',
        dob: new Date('1995-05-05'),
        gender: 'Male',
        phone_number: '4564567890',
        email: 'charlie.davis@example.com',
        address: '202 Elm St',
        status: 1,
        examination_id: 'EX555666',
        clinic_id: 'CL555666'
    },
    {
        id: 6,
        user_name: 'DianaEvans',
        password: 'password123',
        dob: new Date('1980-06-06'),
        gender: 'Female',
        phone_number: '7897891234',
        email: 'diana.evans@example.com',
        address: '303 Birch St',
        status: 1,
        examination_id: 'EX777888',
        clinic_id: 'CL777888'
    },
    {
        id: 7,
        user_name: 'EveFrank',
        password: 'password123',
        dob: new Date('1998-07-07'),
        gender: 'Female',
        phone_number: '1112223333',
        email: 'eve.frank@example.com',
        address: '404 Cedar St',
        status: 1,
        examination_id: 'EX999000',
        clinic_id: 'CL999000'
    },
    {
        id: 8,
        user_name: 'FrankGomez',
        password: 'password123',
        dob: new Date('1978-08-08'),
        gender: 'Male',
        phone_number: '2223334444',
        email: 'frank.gomez@example.com',
        address: '505 Willow St',
        status: 1,
        examination_id: 'EX000111',
        clinic_id: 'CL000111'
    },
    {
        id: 9,
        user_name: 'GraceHill',
        password: 'password123',
        dob: new Date('1991-09-09'),
        gender: 'Female',
        phone_number: '3334445555',
        email: 'grace.hill@example.com',
        address: '606 Ash St',
        status: 1,
        examination_id: 'EX222333',
        clinic_id: 'CL222333'
    },
    {
        id: 10,
        user_name: 'HenryIvy',
        password: 'password123',
        dob: new Date('1961-10-10'),
        gender: 'Male',
        phone_number: '4445556666',
        email: 'henry.ivy@example.com',
        address: '707 Beech St',
        status: 1,
        examination_id: 'EX444555',
        clinic_id: 'CL444555'
    },
    {
        id: 11,
        user_name: 'IvyJones',
        password: 'password123',
        dob: new Date('1992-11-11'),
        gender: 'Female',
        phone_number: '5556667777',
        email: 'ivy.jones@example.com',
        address: '808 Spruce St',
        status: 1,
        examination_id: 'EX666777',
        clinic_id: 'CL666777'
    },
    {
        id: 12,
        user_name: 'JackKing',
        password: 'password123',
        dob: new Date('1975-12-12'),
        gender: 'Male',
        phone_number: '6667778888',
        email: 'jack.king@example.com',
        address: '909 Dogwood St',
        status: 1,
        examination_id: 'EX888999',
        clinic_id: 'CL888999'
    },
    {
        id: 13,
        user_name: 'KaraLee',
        password: 'password123',
        dob: new Date('1982-01-13'),
        gender: 'Female',
        phone_number: '7778889999',
        email: 'kara.lee@example.com',
        address: '1010 Magnolia St',
        status: 1,
        examination_id: 'EX000222',
        clinic_id: 'CL000222'
    },
    {
        id: 14,
        user_name: 'LeoMartinez',
        password: 'password123',
        dob: new Date('1997-02-14'),
        gender: 'Male',
        phone_number: '8889990000',
        email: 'leo.martinez@example.com',
        address: '1111 Sycamore St',
        status: 1,
        examination_id: 'EX333555',
        clinic_id: 'CL333555'
    },
    {
        id: 15,
        user_name: 'MiaNelson',
        password: 'password123',
        dob: new Date('1984-03-15'),
        gender: 'Female',
        phone_number: '9990001111',
        email: 'mia.nelson@example.com',
        address: '1212 Chestnut St',
        status: 1,
        examination_id: 'EX666888',
        clinic_id: 'CL666888'
    },
    {
        id: 16,
        user_name: 'NickOwens',
        password: 'password123',
        dob: new Date('1996-04-16'),
        gender: 'Male',
        phone_number: '0001112222',
        email: 'nick.owens@example.com',
        address: '1313 Poplar St',
        status: 1,
        examination_id: 'EX999111',
        clinic_id: 'CL999111'
    },
    {
        id: 17,
        user_name: 'OliviaPerez',
        password: 'password123',
        dob: new Date('1976-05-17'),
        gender: 'Female',
        phone_number: '1112223334',
        email: 'olivia.perez@example.com',
        address: '1414 Redwood St',
        status: 1,
        examination_id: 'EX111333',
        clinic_id: 'CL111333'
    },
    {
        id: 18,
        user_name: 'PaulQuinn',
        password: 'password123',
        dob: new Date('1986-06-18'),
        gender: 'Male',
        phone_number: '2223334445',
        email: 'paul.quinn@example.com',
        address: '1515 Palm St',
        status: 1,
        examination_id: 'EX222444',
        clinic_id: 'CL222444'
    },
    {
        id: 19,
        user_name: 'QuincyRoss',
        password: 'password123',
        dob: new Date('1993-07-19'),
        gender: 'Male',
        phone_number: '3334445556',
        email: 'quincy.ross@example.com',
        address: '1616 Holly St',
        status: 1,
        examination_id: 'EX333666',
        clinic_id: 'CL333666'
    },
    {
        id: 20,
        user_name: 'RachelScott',
        password: 'password123',
        dob: new Date('1971-08-20'),
        gender: 'Female',
        phone_number: '4445556667',
        email: 'rachel.scott@example.com',
        address: '1717 Walnut St',
        status: 1,
        examination_id: 'EX444777',
        clinic_id: 'CL444777'
    }
];

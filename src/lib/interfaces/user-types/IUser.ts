import { IRole } from '../IRole';

export interface IUser {
    id: number;
    user_name: string;
    password?: string;
    dob?: Date;
    gender?: 'Nam' | 'Nữ' | 'Khác';
    phone_number?: string;
    email?: string;
    address?: string;
    status?: number;
    role?: IRole;
}
const users: IUser[] = [
    {
        id: 1,
        user_name: 'Nguyễn Văn Anh',
        password: 'password123',
        dob: new Date('1990-01-01'),
        gender: 'Nam',
        phone_number: '0987654321',
        email: 'nguyenvananh@example.com',
        address: '123 Đường Chính, Hà Nội',
        status: 1,
        role: {
            id: 1,
            name: 'Admin',
            description: 'Administrator role'
        }
    },
    {
        id: 2,
        user_name: 'Trần Thị Bình',
        password: 'password123',
        dob: new Date('1992-02-02'),
        gender: 'Nữ',
        phone_number: '0123456789',
        email: 'tranthibinh@example.com',
        address: '124 Phố Lớn, TP. Hồ Chí Minh',
        status: 1,
        role: {
            id: 2,
            name: 'User',
            description: 'Regular user role'
        }
    },
    {
        id: 3,
        user_name: 'Lê Văn Cường',
        password: 'password123',
        dob: new Date('1985-03-03'),
        gender: 'Nam',
        phone_number: '0987123456',
        email: 'levancuong@example.com',
        address: '125 Đường Nhỏ, Đà Nẵng',
        status: 1,
        role: {
            id: 2,
            name: 'User',
            description: 'Regular user role'
        }
    },
    {
        id: 4,
        user_name: 'Phạm Thị Dung',
        password: 'password123',
        dob: new Date('1998-09-01'),
        gender: 'Nữ',
        phone_number: '0123789456',
        email: 'phamthidung@example.com',
        address: '126 Phố Mới, Cần Thơ',
        status: 1,
        role: {
            id: 2,
            name: 'User',
            description: 'Regular user role'
        }
    },
    {
        id: 5,
        user_name: 'Ngô Văn Đức',
        password: 'password123',
        dob: new Date('1991-02-01'),
        gender: 'Nam',
        phone_number: '0987654123',
        email: 'ngovanduc@example.com',
        address: '127 Đường Nhỏ, Đà Nẵng',
        status: 1,
        role: {
            id: 2,
            name: 'User',
            description: 'Regular user role'
        }
    },
    {
        id: 6,
        user_name: 'Hoàng Thị Hoa',
        password: 'password123',
        dob: new Date('1996-05-01'),
        gender: 'Nữ',
        phone_number: '0123789456',
        email: 'hoangthihoa@example.com',
        address: '128 Phố Mới, Cần Thơ',
        status: 1,
        role: {
            id: 2,
            name: 'User',
            description: 'Regular user role'
        }
    },
    {
        id: 7,
        user_name: 'Trần Văn Hùng',
        password: 'password123',
        dob: new Date('1993-08-01'),
        gender: 'Nam',
        phone_number: '0987654123',
        email: 'tranvanhung@example.com',
        address: '129 Phố Mới, Cần Thơ',
        status: 1,
        role: {
            id: 2,
            name: 'User',
            description: 'Regular user role'
        }
    },
    {
        id: 8,
        user_name: 'Lê Thị Hương',
        password: 'password123',
        dob: new Date('1994-11-01'),
        gender: 'Nữ',
        phone_number: '0123789456',
        email: 'lethihuong@example.com',
        address: '130 Phố Mới, Cần Thơ',
        status: 1,
        role: {
            id: 2,
            name: 'User',
            description: 'Regular user role'
        }
    },
    {
        id: 9,
        user_name: 'Nguyễn Văn Khoa',
        password: 'password123',
        dob: new Date('1990-06-01'),
        gender: 'Nam',
        phone_number: '0987654123',
        email: 'nguyenvankhoa@example.com',
        address: '131 Phố Mới, Cần Thơ',
        status: 1,
        role: {
            id: 2,
            name: 'User',
            description: 'Regular user role'
        }
    },
    {
        id: 10,
        user_name: 'Trần Thị Lan',
        password: 'password123',
        dob: new Date('1997-07-01'),
        gender: 'Nữ',
        phone_number: '0123789456',
        email: 'tranthilan@example.com',
        address: '132 Phố Mới, Cần Thơ',
        status: 1,
        role: {
            id: 2,
            name: 'User',
            description: 'Regular user role'
        }
    },
    {
        id: 11,
        user_name: 'Lê Văn Minh',
        password: 'password123',
        dob: new Date('1992-10-01'),
        gender: 'Nam',
        phone_number: '0987654123',
        email: 'levantminh@example.com',
        address: '133 Phố Mới, Cần Thơ',
        status: 1,
        role: {
            id: 2,
            name: 'User',
            description: 'Regular user role'
        }
    },
    {
        id: 12,
        user_name: 'Phạm Thị Nga',
        password: 'password123',
        dob: new Date('1995-01-01'),
        gender: 'Nữ',
        phone_number: '0123789456',
        email: 'phamthinga@example.com',
        address: '134 Phố Mới, Cần Thơ',
        status: 1,
        role: {
            id: 2,
            name: 'User',
            description: 'Regular user role'
        }
    },
    {
        id: 13,
        user_name: 'Nguyễn Văn Phong',
        password: 'password123',
        dob: new Date('1991-03-01'),
        gender: 'Nam',
        phone_number: '0987654123',
        email: 'nguyenvanphong@example.com',
        address: '135 Phố Mới, Cần Thơ',
        status: 1,
        role: {
            id: 2,
            name: 'User',
            description: 'Regular user role'
        }
    },
    {
        id: 14,
        user_name: 'Trần Thị Quỳnh',
        password: 'password123',
        dob: new Date('1996-02-01'),
        gender: 'Nữ',
        phone_number: '0123789456',
        email: 'tranthiquynh@example.com',
        address: '136 Phố Mới, Cần Thơ',
        status: 1,
        role: {
            id: 2,
            name: 'User',
            description: 'Regular user role'
        }
    },
    {
        id: 15,
        user_name: 'Lê Văn Sơn',
        password: 'password123',
        dob: new Date('1993-05-01'),
        gender: 'Nam',
        phone_number: '0987654123',
        email: 'levantson@example.com',
        address: '137 Phố Mới, Cần Thơ',
        status: 1,
        role: {
            id: 2,
            name: 'User',
            description: 'Regular user role'
        }
    }
];

export default users;

import { DistrictData } from '../lib/interfaces/IDistrict';
import { ProvinceData } from '../lib/interfaces/IProvince';
import apiClient from './api-client';

export const getProvince = async (): Promise<ProvinceData> => {
    const response = await apiClient({
        method: 'get',
        baseURL: '',
        url: '/tinh_tp.json'
    });
    return response.data as ProvinceData; // cast response data to ProvinceData
};

export const getDistrict = async (provinceName: string): Promise<DistrictData> => {
    try {
        const response = await apiClient({
            method: 'get',
            baseURL: '',
            url: '/quan_huyen.json'
        });

        const districtData: DistrictData = response.data as DistrictData;

        const provinceCodeMap: Record<string, string> = {
            'Thành phố Hà Nội': '01',
            'Tỉnh Hà Giang': '02',
            'Tỉnh Cao Bằng': '04',
            'Tỉnh Bắc Kạn': '06',
            'Tỉnh Tuyên Quang': '08',
            'Tỉnh Lào Cai': '10',
            'Tỉnh Điện Biên': '11',
            'Tỉnh Lai Châu': '12',
            'Tỉnh Sơn La': '14',
            'Tỉnh Yên Bái': '15',
            'Tỉnh Hoà Bình': '17',
            'Tỉnh Thái Nguyên': '19',
            'Tỉnh Lạng Sơn': '20',
            'Tỉnh Quảng Ninh': '22',
            'Tỉnh Bắc Giang': '24',
            'Tỉnh Phú Thọ': '25',
            'Tỉnh Vĩnh Phúc': '26',
            'Tỉnh Bắc Ninh': '27',
            'Tỉnh Hải Dương': '30',
            'Thành phố Hải Phòng': '31',
            'Tỉnh Hưng Yên': '33',
            'Tỉnh Thái Bình': '34',
            'Tỉnh Hà Nam': '35',
            'Tỉnh Nam Định': '36',
            'Tỉnh Ninh Bình': '37',
            'Tỉnh Thanh Hóa': '38',
            'Tỉnh Nghệ An': '40',
            'Tỉnh Hà Tĩnh': '42',
            'Tỉnh Quảng Bình': '44',
            'Tỉnh Quảng Trị': '45',
            'Tỉnh Thừa Thiên Huế': '46',
            'Thành phố Đà Nẵng': '48',
            'Tỉnh Quảng Nam': '49',
            'Tỉnh Quảng Ngãi': '51',
            'Tỉnh Bình Định': '52',
            'Tỉnh Phú Yên': '54',
            'Tỉnh Khánh Hòa': '56',
            'Tỉnh Ninh Thuận': '58',
            'Tỉnh Bình Thuận': '60',
            'Tỉnh Kon Tum': '62',
            'Tỉnh Gia Lai': '64',
            'Tỉnh Đắk Lắk': '66',
            'Tỉnh Đắk Nông': '67',
            'Tỉnh Lâm Đồng': '68',
            'Tỉnh Bình Phước': '70',
            'Tỉnh Tây Ninh': '72',
            'Tỉnh Bình Dương': '74',
            'Tỉnh Đồng Nai': '75',
            'Tỉnh Bà Rịa - Vũng Tàu': '77',
            'Thành phố Hồ Chí Minh': '79',
            'Tỉnh Long An': '80',
            'Tỉnh Tiền Giang': '82',
            'Tỉnh Bến Tre': '83',
            'Tỉnh Trà Vinh': '84',
            'Tỉnh Vĩnh Long': '86',
            'Tỉnh Đồng Tháp': '87',
            'Tỉnh An Giang': '89',
            'Tỉnh Kiên Giang': '91',
            'Thành phố Cần Thơ': '92',
            'Tỉnh Hậu Giang': '93',
            'Tỉnh Sóc Trăng': '94',
            'Tỉnh Bạc Liêu': '95',
            'Tỉnh Cà Mau': '96'
        };
        const provinceCode = provinceCodeMap[provinceName];
        const filteredDistricts: DistrictData = Object.keys(districtData)
            .filter((key) => districtData[key].parent_code === provinceCode)
            .reduce((obj: DistrictData, key) => {
                obj[key] = districtData[key];
                return obj;
            }, {} as DistrictData);

        return filteredDistricts;
    } catch (error) {
        console.error('Error fetching districts:', error);
        throw error;
    }
};

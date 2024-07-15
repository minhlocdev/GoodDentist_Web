import React from 'react';
import { provinceDistrictService } from '../../../services/queries/provinceDistrictQuery';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../select';

interface SelectProvinceProps {
    selectedProvince: string;
    onSelectProvince: (value: string) => void;
}

const SelectProvince: React.FC<SelectProvinceProps> = ({ selectedProvince, onSelectProvince }) => {
    const { data: provinceData, isLoading: isLoadingProvinces } = provinceDistrictService.GetProvince();

    if (isLoadingProvinces) {
        return <div>Loading provinces...</div>;
    }

    return (
        <Select onValueChange={onSelectProvince} value={selectedProvince}>
            <SelectTrigger>
                <SelectValue placeholder="Chọn tỉnh/thành phố" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {provinceData && Object.keys(provinceData).map(key => (
                        <SelectItem
                            key={provinceData[key].code}
                            value={provinceData[key].name_with_type}
                        >
                            {provinceData[key].name_with_type}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectProvince;

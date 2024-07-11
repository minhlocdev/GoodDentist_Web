import React from 'react';
import { provinceDistrictService } from '../../../services/queries/provinceDistrictQuery';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../select';

interface SelectDistrictProps {
    selectedProvince: string;
    selectedDistrict: string;
    onSelectDistrict: (value: string) => void;
}

const SelectDistrict: React.FC<SelectDistrictProps> = ({
    selectedProvince,
    selectedDistrict,
    onSelectDistrict
}) => {
    const { data: districtData, isLoading } = provinceDistrictService.GetDistrict(selectedProvince);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Select
            disabled={!selectedProvince}
            onValueChange={onSelectDistrict}
            value={selectedDistrict}
        >
            <SelectTrigger>
                <SelectValue placeholder="Chọn quận/huyện" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Object.keys(districtData ?? {}).map((key) => (
                        <SelectItem
                            key={districtData?.[key].code}
                            value={districtData?.[key].name_with_type ?? ''}
                        >
                            {districtData?.[key].name_with_type}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectDistrict;

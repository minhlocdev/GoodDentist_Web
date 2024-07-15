type ParamValue = string | number | boolean | null | undefined;

export const paramsToString = <T extends Record<string, ParamValue>>(params: T): string => {
    return Object.entries(params)
        .filter(([, value]) => value != null)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&');
};

export const extractLastDistrictAndProvince = (address: string) => {
    const parts = address.split('-').map((part) => part.trim());

    const districtRegex = /(Quận|Huyện|Thành phố)\s(.*)/i;
    const provinceRegex = /(Tỉnh)\s(.*)/i;

    const districts = parts.filter((part) => districtRegex.test(part));
    const provinces = parts.filter((part) => provinceRegex.test(part));
    const remainingParts = parts.filter(
        (part) =>
            part !== districts[districts.length - 1] && part !== provinces[provinces.length - 1]
    );
    const remainingAddress = remainingParts.join(' - ');

    return { address: remainingAddress, district: districts[0], province: provinces[0] };
};

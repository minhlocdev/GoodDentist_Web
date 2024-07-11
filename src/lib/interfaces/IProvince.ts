export interface Province {
    name: string;
    slug: string;
    type: string;
    name_with_type: string;
    code: string;
}

export type ProvinceData = Record<string, Province>;

type ParamValue = string | number | boolean | null | undefined;

export const paramsToString = <T extends Record<string, ParamValue>>(params: T): string => {
    return Object.entries(params)
        .filter(([, value]) => value != null)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&');
};

export declare type Countries = Record<string, string>;
export declare type CountryCodes = Array<string>;
export declare type CustomLabels = Record<string, string | CustomLabel>;
export declare type CustomLabel = {
    primary: string;
    secondary?: string;
};
export declare type OnSelect = (countryCode: string) => void;

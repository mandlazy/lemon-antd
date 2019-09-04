export declare const handlerOptions: (option: any, textKey: string, valueKey: string) => {
    [x: string]: any;
    option?: undefined;
    optionProps?: undefined;
} | {
    option: {
        [x: string]: any;
    };
    optionProps: any;
};
export interface IOption {
    text: string;
    value: string;
}

/// <reference types="react" />
export interface ILinkProps {
    to: string;
    children: any;
    [propName: string]: any;
}
declare const Link: {
    ({ children, to }: ILinkProps): JSX.Element;
    displayName: string;
    __docgenInfo: {
        "description": string;
        "displayName": string;
        "props": {
            "to": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
        };
    };
};
export default Link;

import './style.scss';
import { ReactElement } from 'react';
interface ILabelProps {
    title: string;
    className?: string;
    children: ReactElement<any>;
}
declare function Label({ title, className, children }: ILabelProps): JSX.Element;
declare namespace Label {
    var displayName: string;
    var __docgenInfo: {
        "description": string;
        "displayName": string;
        "props": {
            "title": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
            "className": {
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
}
export default Label;

/// <reference types="react" />
import './style.scss';
interface IPageLoadingProps {
    hide?: boolean;
    tip?: string;
    bgColor?: string;
}
declare function PageLoading(props: IPageLoadingProps): JSX.Element;
declare namespace PageLoading {
    var displayName: string;
    var __docgenInfo: {
        "description": string;
        "displayName": string;
        "props": {
            "hide": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
            "tip": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
            "bgColor": {
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
export default PageLoading;

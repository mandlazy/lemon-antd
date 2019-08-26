import './style.scss';
import { MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
export interface IOverlayerProps {
    onClick?: MouseEventHandler;
    bgColor?: string;
    zIndex?: number;
    hide?: boolean;
    children?: JSX.Element;
}
declare function Overlayer(props: IOverlayerProps): JSX.Element | null;
declare namespace Overlayer {
    var propTypes: {
        bgColor: PropTypes.Requireable<string>;
        zIndex: PropTypes.Requireable<number>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        hide: PropTypes.Requireable<boolean>;
    };
    var defaultProps: {
        bgColor: string;
        zIndex: number;
    };
    var displayName: string;
    var __docgenInfo: {
        "description": string;
        "displayName": string;
        "props": {
            "onClick": {
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
            "zIndex": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
            "hide": {
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
export default Overlayer;

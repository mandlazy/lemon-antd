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
}
export default Overlayer;

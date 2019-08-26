import './style.scss';
import { Component } from 'react';
export interface ILoadingProps {
    hide?: boolean;
    size?: number;
}
export interface ILoadingState {
    hide?: boolean;
}
declare class Loading extends Component<ILoadingProps, ILoadingState> {
    static newInstance: any;
    constructor(props: ILoadingProps);
    triggle: (hide: boolean) => void;
    render(): JSX.Element;
}
export default Loading;

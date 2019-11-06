import './style.scss';
import { Component } from 'react';
import moment, { Moment } from 'moment';
export interface IState {
    startTime?: Moment;
    endTime?: Moment;
    endOpen?: boolean;
    [propName: string]: any;
}
export interface IProps {
    showTime?: boolean;
    prefix?: string;
    endOpen?: boolean;
    [propName: string]: any;
    isReset?: boolean;
    onChange?: (object: any) => void;
}
declare class DateRangePicker extends Component<IProps, IState> {
    static defaultProps: {
        showTime: boolean;
        endOpen: boolean;
        isReset: boolean;
    };
    format: string;
    constructor(props: IProps);
    setValue: (key: string, value: moment.Moment) => void;
    handleStartOpenChange: (open: boolean) => void;
    handleEndOpenChange: (open: boolean) => void;
    disabledStartDate: (startTime: moment.Moment | undefined) => boolean;
    disabledEndDate: (endTime: moment.Moment | undefined) => boolean;
    save: (key: string, value: moment.Moment) => void;
    handleTimeChange: (key: string, value: moment.Moment) => void;
    getTime: (value?: any) => {
        startTime: any;
        endTime: any;
    };
    componentDidUpdate(prevProps: any, prevState: any): void;
    reset: () => void;
    render(): JSX.Element;
}
export default DateRangePicker;

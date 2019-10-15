import './style.scss';
import React, { Component } from 'react';
import { DatePicker, Row, Col } from 'antd';
import Label from '../Label';
import moment from 'moment';
class DateRangePicker extends Component {
    constructor(props) {
        super(props);
        this.format = 'YYYY-MM-DD';
        this.setValue = (key, value) => {
            this.setState({ [key]: value });
        };
        this.handleStartOpenChange = (open) => {
            if (!open) {
                this.setState({ endOpen: true });
            }
        };
        this.handleEndOpenChange = (open) => {
            this.setState({ endOpen: open });
        };
        this.disabledStartDate = (startTime) => {
            const { endTime } = this.state;
            if (!startTime || !endTime)
                return false;
            return startTime.valueOf() > endTime.valueOf();
        };
        this.disabledEndDate = (endTime) => {
            const { startTime } = this.state;
            if (!endTime || !startTime)
                return false;
            return endTime.valueOf() <= startTime.valueOf();
        };
        this.save = (key, value) => {
            const { onChange } = this.props;
            if (onChange) {
                onChange({
                    ...this.props.value,
                    [key]: value ? value.format(this.format) : null
                });
            }
        };
        this.handleTimeChange = (key, value) => {
            this.setValue(key, value);
            this.save(key, value);
        };
        this.getTime = (value = {}) => {
            const { startTime, endTime } = this.state;
            return {
                startTime: value.startTime || startTime,
                endTime: value.endTime || endTime
            };
        };
        this.reset = () => {
            this.setState({
                startTime: undefined,
                endTime: undefined,
                endOpen: this.props.endOpen
            });
        };
        this.state = {
            startTime: undefined,
            endTime: undefined,
            endOpen: props.endOpen
        };
    }
    render() {
        const { className = '', showTime = false, startTimeTitle, endTimeTitle = '', value, isReset, } = this.props;
        const { endOpen } = this.state;
        if (isReset) {
            this.reset();
        }
        const { startTime, endTime } = this.getTime(value);
        this.format = 'YYYY-MM-DD' + (showTime ? ' HH:mm:ss' : '');
        return (React.createElement(Row, { gutter: 8, className: 'date-range ' + className },
            React.createElement(Col, { span: 11 },
                React.createElement(Label, { className: 'date-range-label', title: startTimeTitle },
                    React.createElement(DatePicker, { disabledDate: this.disabledStartDate, showTime: showTime, format: this.format, value: startTime ? moment(startTime) : undefined, placeholder: 'Start', onChange: this.handleTimeChange.bind(this, 'startTime'), onOpenChange: this.handleStartOpenChange }))),
            React.createElement(Col, { className: 'date-range-span', span: 1 }, "--"),
            React.createElement(Col, { span: 11 },
                React.createElement(Label, { className: 'date-range-label', title: endTimeTitle },
                    React.createElement(DatePicker, { disabledDate: this.disabledEndDate, showTime: showTime, format: this.format, value: endTime ? moment(endTime) : undefined, placeholder: 'End', open: endOpen, onChange: this.handleTimeChange.bind(this, 'endTime'), onOpenChange: this.handleEndOpenChange })))));
    }
}
DateRangePicker.defaultProps = {
    showTime: false,
    endOpen: false,
    isReset: false
};
export default DateRangePicker;
//# sourceMappingURL=index.js.map
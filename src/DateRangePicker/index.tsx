import './style.scss';
import React, { Component } from 'react';
import { DatePicker, Row, Col } from 'antd';
import Label from '../Label';
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

class DateRangePicker extends Component<IProps, IState> {
  static defaultProps = {
    showTime: false,
    endOpen: false,
    isReset: false
  };
  public format = 'YYYY-MM-DD';
  constructor(props: IProps) {
    super(props);
    this.state = {
      startTime: undefined,
      endTime: undefined,
      endOpen: props.endOpen
    };
  }
  setValue = (key: string, value: Moment) => {
    this.setState({ [key]: value });
  }
  handleStartOpenChange = (open: boolean) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }
  handleEndOpenChange = (open: boolean) => {
    this.setState({ endOpen: open });
  }
  disabledStartDate = (startTime: Moment | undefined): boolean => {
    const { endTime } = this.state;
    if (!startTime || !endTime) return false;
    return startTime.valueOf() > endTime.valueOf();
  }
  disabledEndDate = (endTime: Moment | undefined): boolean => {
    const { startTime } = this.state;
    if (!endTime || !startTime) return false;
    return endTime.valueOf() <= startTime.valueOf();
  }
  save = (key: string, value: Moment) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        ...this.props.value,
        [key]: value ? value.format(this.format) : null
      });
    }
  }
  handleTimeChange = (key: string, value: Moment) => {
    this.setValue(key, value);
    this.save(key, value);
  }
  getTime = (value: any = {}) => {
    const { startTime, endTime } = this.state;
    return {
      startTime: value.startTime || startTime,
      endTime: value.endTime || endTime
    };
  }
  componentDidUpdate (prevProps: any, prevState: any) {
    if (prevProps.value !== this.props.value && !this.props.value) {
      this.reset();
    }
  }
  reset = () => {
    this.setState(() => ({
      startTime: undefined,
      endTime: undefined,
      endOpen: this.props.endOpen
    }));
  }
  render() {
    const {
      className = '',
      showTime = false,
      startTimeTitle,
      endTimeTitle = '',
      value
    } = this.props;
    const { endOpen } = this.state;
    const { startTime, endTime } = this.getTime(value);
    this.format = 'YYYY-MM-DD' + (showTime ? ' HH:mm:ss' : '');
    return (
      <Row gutter={8} className={'date-range ' + className}>
        <Col span={11}>
          <Label
            className='date-range-label'
            title={startTimeTitle}
          >
            <DatePicker
              disabledDate={this.disabledStartDate}
              showTime={showTime}
              format={this.format}
              value={startTime ? moment(startTime) : undefined}
              placeholder='Start'
              onChange={this.handleTimeChange.bind(this, 'startTime')}
              onOpenChange={this.handleStartOpenChange}
            />
          </Label>
        </Col>
        <Col
          className='date-range-span'
          span={1}
        >
          -
        </Col>
        <Col span={11}>
          <Label
            className='date-range-label'
            title={endTimeTitle}
          >
            <DatePicker
              disabledDate={this.disabledEndDate}
              showTime={showTime}
              format={this.format}
              value={endTime ? moment(endTime) : undefined}
              placeholder='End'
              open={endOpen}
              onChange={this.handleTimeChange.bind(this, 'endTime')}
              onOpenChange={this.handleEndOpenChange}
            />
          </Label>
        </Col>
      </Row>
    );
  }
}

export default DateRangePicker;

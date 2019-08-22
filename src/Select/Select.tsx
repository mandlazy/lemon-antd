import React, { PureComponent } from 'react';
import { Select as AndSelect } from 'antd';
import { handlerOptions, IOption } from '../utils/Option';

export interface ISelectProps {
  options: Array<IOption | string>;
  [propName: string]: any;
}

class Select extends PureComponent<ISelectProps> {
  static defaultProps = {
    width: 200
  };
  render() {
    const { options, width, ...props } = this.props;
    return (
       <AndSelect style={{ width }} className='select' {...props}>
        {options.map((ops, index) => {
          const { text, value } = handlerOptions(ops);
          return (
            <AndSelect.Option className='select-option' key={index} value={value}>
              {text}
            </AndSelect.Option>
          );
        })}
      </AndSelect>
    );
  }
}

export default Select;

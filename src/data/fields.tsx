import React from 'react';
import Select from '../Select';
import RadioGroup from '../RadioGroup';
import CheckboxGroup from '../CheckboxGroup';
import DateRangePicker from '../DateRangePicker';
import { Input, Checkbox } from 'antd';
const { TextArea } = Input;

export const COMMON_FILELDS = {
  select: (props: any) => <Select options={[]} {...props} />,
  input: (props: any) => <Input {...props} />,
  radios: (props: any) => <RadioGroup options={[]} {...props} />,
  checkbox: (props: any) => <Checkbox {...props} />,
  checkboxs: (props: any) => <CheckboxGroup options={[]} {...props} />,
  textarea: (props: any) => <TextArea {...props} />,
  dateRange: (props: any) => <DateRangePicker {...props}/>,
};

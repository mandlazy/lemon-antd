import React from 'react';
import Select from '../Select';
import RadioGroup from '../RadioGroup';
import CheckboxGroup from '../CheckboxGroup';
import DateRangePicker from '../DateRangePicker';
import { Input, Checkbox } from 'antd';
const { TextArea } = Input;
export const COMMON_FILELDS = {
    select: (props) => React.createElement(Select, Object.assign({ options: [] }, props)),
    input: (props) => React.createElement(Input, Object.assign({}, props)),
    radios: (props) => React.createElement(RadioGroup, Object.assign({ options: [] }, props)),
    checkbox: (props) => React.createElement(Checkbox, Object.assign({}, props)),
    checkboxs: (props) => React.createElement(CheckboxGroup, Object.assign({ options: [] }, props)),
    textarea: (props) => React.createElement(TextArea, Object.assign({}, props)),
    dateRange: (props) => React.createElement(DateRangePicker, Object.assign({}, props)),
};
//# sourceMappingURL=fields.js.map
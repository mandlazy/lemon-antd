import React, { PureComponent } from 'react';
import { Select as AndSelect } from 'antd';
import { handlerOptions } from '../utils/Option';
class Select extends PureComponent {
    render() {
        const { options, width, textKey = 'text', valueKey = 'value', ...props } = this.props;
        return (React.createElement(AndSelect, Object.assign({ style: { width }, className: 'select' }, props), options.map((ops) => {
            const { option = {}, optionProps } = handlerOptions(ops, textKey, valueKey);
            return (React.createElement(AndSelect.Option, Object.assign({ className: 'select-option', key: option[valueKey], value: option[valueKey] }, optionProps), option[textKey]));
        })));
    }
}
Select.defaultProps = {
    width: 200
};
export default Select;
//# sourceMappingURL=index.js.map
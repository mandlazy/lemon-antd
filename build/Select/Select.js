import React, { PureComponent } from 'react';
import { Select as AndSelect } from 'antd';
import { handlerOptions } from '../utils/Option';
class Select extends PureComponent {
    render() {
        const { options, width, ...props } = this.props;
        return (React.createElement(AndSelect, Object.assign({ style: { width }, className: 'select' }, props), options.map((ops, index) => {
            const { text, value } = handlerOptions(ops);
            return (React.createElement(AndSelect.Option, { className: 'select-option', key: index, value: value }, text));
        })));
    }
}
Select.defaultProps = {
    width: 200
};
export default Select;
//# sourceMappingURL=Select.js.map
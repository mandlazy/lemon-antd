import React, { PureComponent } from 'react';
import { Radio } from 'antd';
import { handlerOptions } from '../utils/Option';
class RadioGroup extends PureComponent {
    render() {
        const { options, ...props } = this.props;
        return (React.createElement(Radio.Group, Object.assign({}, props), options.map((ops) => {
            const { text, value } = handlerOptions(ops);
            return (React.createElement(Radio, { key: value, className: 'radio', value: value }, text));
        })));
    }
}
export default RadioGroup;
//# sourceMappingURL=index.js.map
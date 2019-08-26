import './style.scss';
import React from 'react';
import Overlayer from '../Overlayer';
import { Spin } from 'antd';
function PageLoading(props) {
    const { hide, bgColor = 'rgba(0,0,0,0.1)', tip = 'loading...' } = props;
    return (React.createElement(Overlayer, { bgColor: bgColor, hide: hide, zIndex: 9 },
        React.createElement(Spin, { className: 'pageloading', tip: tip, size: 'large' })));
}
export default PageLoading;
//# sourceMappingURL=index.js.map
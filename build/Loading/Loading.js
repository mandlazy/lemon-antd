import './style.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Overlayer from '../Overlayer';
import { Spin, Icon } from 'antd';
class Loading extends Component {
    constructor(props) {
        super(props);
        this.triggle = (hide) => {
            this.setState(() => ({ hide }));
        };
        this.state = {
            hide: props.hide
        };
    }
    render() {
        const { size = 48 } = this.props;
        const { hide } = this.state;
        const loadingIcon = (React.createElement(Icon, { className: 'loading-icon', type: 'loading', style: { fontSize: size }, spin: true }));
        return (React.createElement(Overlayer, { hide: hide, zIndex: 9 },
            React.createElement(Spin, { className: 'loading', indicator: loadingIcon })));
    }
}
Loading.newInstance = (props, callback) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    let called = false;
    function ref(loading) {
        if (called) {
            return;
        }
        called = true;
        callback({
            component: loading,
            triggle(invisiable) {
                loading.triggle(invisiable);
            },
            destroy() {
                ReactDOM.unmountComponentAtNode(div);
                if (div.parentNode) {
                    div.parentNode.removeChild(div);
                }
            }
        });
    }
    ReactDOM.render(React.createElement(Loading, Object.assign({}, props, { ref: ref })), div);
};
export default Loading;
//# sourceMappingURL=Loading.js.map
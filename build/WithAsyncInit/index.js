import React, { PureComponent } from 'react';
function withAsyncInit(WrapComponet, ops = {}) {
    var _a;
    const { asyncDataKey = 'options' } = ops;
    return _a = class extends PureComponent {
            constructor(props) {
                super(props);
                this.onAsyncInit = async () => {
                    const { onAsyncInit } = this.props;
                    if (onAsyncInit) {
                        const data = await onAsyncInit();
                        this.setState({ [asyncDataKey]: data });
                    }
                };
                this.state = {
                    [asyncDataKey]: props[asyncDataKey]
                };
            }
            componentDidMount() {
                this.onAsyncInit();
            }
            render() {
                const { onAsyncInit, ...props } = this.props;
                const asyncData = this.state[asyncDataKey];
                const asyncProps = {
                    ...props,
                    [asyncDataKey]: asyncData
                };
                return React.createElement(WrapComponet, Object.assign({}, asyncProps));
            }
        },
        _a.defaultProps = {
            [asyncDataKey]: []
        },
        _a;
}
export default withAsyncInit;
//# sourceMappingURL=index.js.map
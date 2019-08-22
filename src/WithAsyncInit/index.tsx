import React, { PureComponent, ComponentType } from 'react';

export interface IAsyncInitProps {
  onAsyncInit: () => any;
  [propName: string]: any;
}

function withAsyncInit(WrapComponet: ComponentType<any>, ops: any = {}) {
  const { asyncDataKey = 'options' } = ops;
  return class extends PureComponent<IAsyncInitProps, any> {
    static defaultProps = {
      [asyncDataKey]: []
    };
    constructor(props: any) {
      super(props);
      this.state = {
        [asyncDataKey]: props[asyncDataKey]
      };
    }
    componentDidMount() {
      this.onAsyncInit();
    }
    onAsyncInit = async () => {
      const { onAsyncInit } = this.props;
      if (onAsyncInit) {
        const data = await onAsyncInit();
        this.setState({ [asyncDataKey]: data });
      }
    }
    render() {
      const { onAsyncInit, ...props } = this.props;
      const asyncData = this.state[asyncDataKey];
      const asyncProps = {
        ...props,
        [asyncDataKey]: asyncData
      };
      return <WrapComponet {...asyncProps} />;
    }
  };
}

export default withAsyncInit;

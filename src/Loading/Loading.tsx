import './style.scss';
import React, { Component, FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import Overlayer from '../Overlayer';
import { Spin, Icon } from 'antd';

export interface ILoadingProps {
  hide?: boolean;
  size?: number;
}
export interface ILoadingState {
  hide?: boolean;
}
class Loading extends Component<ILoadingProps, ILoadingState> {
  static newInstance: any;
  constructor(props: ILoadingProps) {
    super(props);
    this.state = {
      hide: props.hide
    };
  }
  triggle = (hide: boolean) => {
    this.setState(() => ({ hide }));
  }
  render() {
    const { size = 48 } = this.props;
    const { hide } = this.state;
    const loadingIcon = (
      <Icon
        className='loading-icon'
        type='loading'
        style={{ fontSize: size }}
        spin
      />
    );
    return (
      <Overlayer hide={hide} zIndex={9}>
        <Spin className='loading' indicator={loadingIcon} />
      </Overlayer>
    );
  }
}

Loading.newInstance = (props: ILoadingProps, callback: any) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let called = false;
  function ref(loading: any) {
    if (called) {
      return;
    }
    called = true;
    callback({
      component: loading,
      triggle(invisiable: boolean) {
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
  ReactDOM.render(<Loading {...props} ref={ref} />, div);
};

export default Loading;

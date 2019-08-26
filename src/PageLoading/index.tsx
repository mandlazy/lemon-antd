import './style.scss';
import React from 'react';
import Overlayer from '../Overlayer';
import { Spin } from 'antd';

interface IPageLoadingProps {
  hide?: boolean;
  tip?: string;
  bgColor?: string;
}

function PageLoading(props: IPageLoadingProps) {
  const { hide, bgColor = 'rgba(0,0,0,0.1)', tip = 'loading...' } = props;
  return (
    <Overlayer bgColor={bgColor} hide={hide} zIndex={9}>
      <Spin className='pageloading' tip={tip} size='large' />
    </Overlayer>
  );
}

export default PageLoading;

import './style.scss';
import React from 'react';
import { Button } from 'antd';

interface IProps {
  /**
   * Text for the button
   */
  text: string;
}

const ExampleButton = (props: IProps) => {
  return (
    <Button className='button' type='primary'>
      {props.text}
    </Button>
  );
};

export default ExampleButton;

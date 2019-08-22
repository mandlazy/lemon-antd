import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import RadioGroup from './index';
import { IOption } from '../utils/Option';

const stories = storiesOf('RadioGroup', module);
export const options: Array<IOption | string> = ['选项1', '选项2', '选项3'];

stories.addDecorator(StoryRouter()).add(
  'with options list',
  () => (
    <RadioGroup
      options={options}
    />
  ),
);

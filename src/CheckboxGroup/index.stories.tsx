import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import CheckboxGroup from './index';
import { IOption } from '../utils/Option';
import withAsyncInit from '../WithAsyncInit';

const AsyncCheckboxGroup = withAsyncInit(CheckboxGroup);
const stories = storiesOf('CheckboxGroup', module);
export const options: Array<IOption | string> = ['选项1', '选项2', '选项3'];

const onAsyncInit = async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Async1', 'Async2', 'Async3']);
  }, 1000);
  });
  return await promise;
};

stories.addDecorator(StoryRouter()).add(
  'with options',
  () => (
    <CheckboxGroup
      options={options}
    />
  ),
);

stories.addDecorator(StoryRouter()).add(
  'with async options',
  () => (
    <AsyncCheckboxGroup
      onAsyncInit={onAsyncInit}
    />
  ),
);

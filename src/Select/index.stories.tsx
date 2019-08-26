import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import Select from './index';
import withAsyncInit from '../WithAsyncInit';
import { IOption } from '../utils/Option';
const AsyncSelect = withAsyncInit(Select);
const stories = storiesOf('Select', module);
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
    <Select
      options={options}
    />
  ),
);

stories.addDecorator(StoryRouter()).add(
  'with async options',
  () => (
    <AsyncSelect
      onAsyncInit={onAsyncInit}
      options={options}
    />
  ),
);

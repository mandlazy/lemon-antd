import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import PageLoading from './index';
const stories = storiesOf('PageLoading', module);

stories.addDecorator(StoryRouter()).add(
  'loading show and hide',
  () => (
    <PageLoading/>
  )
);

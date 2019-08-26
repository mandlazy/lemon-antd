import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import Loading from './index';
const stories = storiesOf('Loading', module);

stories.addDecorator(StoryRouter()).add(
  'loading show and hide',
  () => {
    Loading.show();
    setTimeout(() => {
      Loading.hide();
    }, 1500);
    return <div/>;
  }
);

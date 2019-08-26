import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import Nomatch from './index';
const stories = storiesOf('Nomatch', module);

stories.addDecorator(StoryRouter()).add(
  'Nomatch',
  () => ( <Nomatch/> )
);

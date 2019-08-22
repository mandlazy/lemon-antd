import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import DateRangePicker from './index';

const stories = storiesOf('DateRangePicker', module);

stories.addDecorator(StoryRouter()).add(
  'common',
  () => (
    <DateRangePicker value={{ startTime: undefined, endTime: undefined }} />
  ),
);

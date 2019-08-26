import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import Table from './index';
const stories = storiesOf('Table', module);

export const columns = [
  {
    title: '筛选',
    width: 70,
    dataIndex: 'selectBtn',
    type: 'checkbox'
  },
  {
    title: '下限',
    width: 160,
    dataIndex: 'leftValue'
  },
  {
    title: '上限',
    dataIndex: 'rightValue',
    width: 160
  },
  {
    title: '左包含',
    dataIndex: 'leftOperator',
    type: 'select',
    width: 100,
  },
  {
    title: '右包含',
    dataIndex: 'rightOperator',
    width: 100
  },
  {
    title: '有效期（天）',
    dataIndex: 'termDay',
    width: 120
  }
];

stories.addDecorator(StoryRouter()).add(
  'Table',
  () => (
    <Table columns={columns} />
  )
);

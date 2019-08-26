import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import Form, { IFieldItem } from './index';

const stories = storiesOf('Form', module);
export const fields: IFieldItem[] =  [
  {
    label: '渠道',
    type: 'checkboxs',
    name: 'channelCodeList',
    fieldType: 'array',
    options: ['a', 'b', 'c']
  },
  {
    label: '活动名称',
    name: 'activityName',
    placeholder: '不超过30个字符',
    rules: [
      { required: true, message: '必填'},
      { max: 30, message: '不超过30个字符' },
      { pattern: /^[\u4e00-\u9fa5a-z\d]+$/gi, message: '不能输入特殊字符' }
    ]
  },
  {
    name: 'rangeTime',
    prefix: '活动',
    type: 'dateRange',
    fieldType: 'object',
    showTime: true,
    current: true,
    className: 'activity-date-range',
    endTimeMoreInfo: '不选择默认为永久',
    rules: [{
      validator(rule: any, value: any = {}, cb: any) {
        const { startTime } = value;
        if (!startTime) cb('活动开始时间不能为空');
        cb();
      }
    }]
  },
  {
    label: '营销工具',
    type: 'checkboxs',
    options: [{ text: '免息券', value: '0' }],
    name: 'activityModeList',
    fieldType: 'array',
  },
  {
    label: '免息券名称',
    name: 'couponList',
    type: 'radios',
    fieldType: 'array',
    options: ['a', 'b', 'c']
  },
  {
    label: '活动简介',
    className: 'activity-field',
    type: 'textarea',
    placeholder: '介绍活动内容',
    name: 'activityIntroduction',
    maxLength: 200,
    rows: 4,
  }
];
stories.addDecorator(StoryRouter()).add(
  'From',
  () => (
    <Form
      footerDividerLine={true}
      titleDividerLine={true}
      title='测试一下'
      fields={fields} />
  ),
);

stories.addDecorator(StoryRouter()).add(
  'Filter group',
  () => (
    <Form fields={fields} type='horizontal' />
  ),
);

stories.addDecorator(StoryRouter()).add(
  '多个表',
  () => (
    <Form
      titleDividerLine={true}
      btns={[{
        type: 'primary',
        htmlType: 'submit',
        text: '登录'
      }]}
      multiple={true}
      fields={[ { title: '测试一', fields}, { title: '测试二', fields} ]}  />
  ),
);

stories.addDecorator(StoryRouter()).add(
  '自定义btns',
  () => (
    <Form
      titleDividerLine={true}
      btns={[{
        type: 'primary',
        htmlType: 'submit',
        text: '登录'
      }]}
      fields={fields}  />
  ),
);

import React, { Component, PureComponent, SVGProps } from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import Form, { IFieldItem } from './index';
import { Input } from 'antd';

class Imge extends PureComponent<any> {
  render() {
    const { value, viewing } = this.props;
    return (
      viewing ? <img src={value}/> : <Input />
    );
  }
}

const components = {
  image: (props: any) => <Imge {...props}/>
};

const stories = storiesOf('Form', module);
export const fields: IFieldItem[] =  [
  {
    label: '渠道',
    type: 'radios',
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
    value: 'b',
    fieldType: 'array',
    useDefinedViewingComponent: true,
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
    rules: [{ required: true }]
  }
];
const field1 = [
  {
    label: '名称',
    name: 'couponList1',
    fieldType: 'array',
    value: 'dadadd',
    rules: [{ required: true }]
  },
  {
    label: '免息券名称',
    name: 'couponList',
    type: 'radios',
    fieldType: 'array',
    value: 'a',
    options: ['a', 'b', 'c']
  },
  {
    label: '活动简介',
    className: 'activity-field',
    type: 'textarea',
    placeholder: '介绍活动内容',
    name: 'activityIntroduction1',
    maxLength: 200,
    value: 'dasddadsaadasd',
    rows: 4,
    rules: [{ required: true }]
  }
];
const field2 = [
  {
    label: '活动简介',
    className: 'activity-field1',
    type: 'textarea',
    placeholder: '介绍活动内容',
    name: 'activityIntroduction',
    maxLength: 200,
    rows: 4,
    rules: [{ required: true }]
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

class Page extends Component {
  fields: any = { a: [
    {title: '1', fields},
    {title: '2', fields: field1} ],
    b: [ {title: '3', fields: field1 }] };
  state = {
    type: 'a'
  };
  renderField = (e: any) => {
    this.setState({
      type: e.target.value
    });
  }
  render() {
    const { type } = this.state;
    this.fields[type][0].fields[0].onChange = this.renderField;
    return (
      <Form
        viewing={true}
        titleDividerLine={true}
        multiple={true}
        components={components}
        btns={[{
          type: 'primary',
          htmlType: 'submit',
          text: '登录'
        }]}
        fields={this.fields[type][0]}  />
    );
  }
}

stories.addDecorator(StoryRouter()).add(
  '自定义btns',
  () => <Page/>
);

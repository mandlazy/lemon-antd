import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { Button, Form } from 'antd';
import EditTable from './index';
const stories = storiesOf('EditTable', module);
const required = { required: true, message: '必填' };

const DeleteBtn = (props: any) => {
  const { onClick } = props;
  return (
    <Button onClick={() => {
      onClick(props['row-index']);
    }}>删除</Button>
  );
};
export const columns: any[] = [
  {
    title: '筛选',
    width: 70,
    dataIndex: 'selectBtn',
    type: 'checkbox'
  },
  {
    title: '下限',
    width: 160,
    dataIndex: 'leftValue',
    rules: [ required ]
  },
  {
    title: '上限',
    dataIndex: 'rightValue',
    width: 160,
    rules: [ required ]
  },
  {
    title: '左包含',
    dataIndex: 'leftOperator',
    type: 'select',
    options: ['1', '2', '3'],
    width: 100
  },
  {
    title: '右包含',
    dataIndex: 'rightOperator',
    type: 'select',
    width: 100,
    rules: [required ]
  },
  {
    title: '有效期（天）',
    dataIndex: 'termDay',
    width: 120
  },
  {
    title: '操作',
    dataIndex: 'delete',
    type: 'deleteBtn'
  }
];

interface ICol {
  leftValue?: string;
  rightValue?: string;
  leftOperator?: string;
  rightOperator?: string;
  termDay?: string;
  checked?: boolean;
}

const initialData: ICol = {
  leftValue: '',
  rightValue: '',
  leftOperator: '',
  rightOperator: '',
  termDay: '',
  checked: false
};
function EditTableComp() {
  const [ data, setData ] = useState<ICol[]>([]);
  const add = () => {
    setData([ ...data, initialData ]);
  };
  const index = columns.findIndex((col) => col.dataIndex === 'delete');
  columns[index].onClick = (rowIndex: number) => {
    const _data = [...data];
    _data.splice(rowIndex, 1);
    setData(_data);
  };
  const onChange = (values: any) => {
    // tslint:disable-next-line
    console.log(values);
  };
  const onError = (errors: any) => {
    // tslint:disable-next-line
    console.log(errors);
  };
  const save = () => {
    // tslint:disable-next-line
    console.log('save');
  };
  return (
    <Form>
      <Button onClick={add}>增加</Button>
      <Button onClick={save}>保存</Button>
      <EditTable
        onError={onError}
        onChange={onChange}
        components={{ deleteBtn: DeleteBtn }}
        data={data}
        columns={columns} />
    </Form>
  );
}

stories.addDecorator(StoryRouter()).add(
  'EditTable',
  () => <EditTableComp />
);

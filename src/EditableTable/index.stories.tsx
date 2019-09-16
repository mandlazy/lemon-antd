import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { Button, Form, Icon, Input } from 'antd';
import EditTable from './index';
const stories = storiesOf('EditTable', module);
const required = { required: true, message: '必填' };

const DeleteBtn = (props: any) => {
  const { onClick } = props;
  return (
    <Button onClick={() => {
      onClick(props['data-row-index']);
    }}>删除</Button>
  );
};
const handleSave = (selectedKeys: any, confirm: any) => {
   // tslint:disable-next-line
  console.log(selectedKeys);
  // tslint:disable-next-line
  confirm();
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
    width: 100,
    render: (record: any = {}) => <span>{record.leftOperator}</span>
  },
  {
    title: '右包含',
    dataIndex: 'rightOperator',
    type: 'select',
    width: 100,
    rules: [required ],
  },
  {
    title: '有效期（天）',
    colsOps: {
      filterIcon: () => (
        <Icon type='edit' className='edit-btn' />
      ),
      filterDropdown: (res: any) => {
        const { setSelectedKeys, selectedKeys, confirm } = res;
        return (
          <div style={{ padding: 8 }}>
          <Input
            placeholder={`输入批量设置的值`}
            value={selectedKeys[0]}
            onChange={(e: any) => { setSelectedKeys(e.target.value ? [e.target.value] : []); }}
            onPressEnter={() => handleSave(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type='primary'
            onClick={() => handleSave(selectedKeys, confirm)}
            size='small'
            style={{ width: 90, marginRight: 8 }}>
            保存
          </Button>
        </div>
        );
      }
    },
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
  leftValue?: string | any[];
  rightValue?: string;
  leftOperator?: string;
  rightOperator?: string;
  termDay?: string;
  checked?: boolean;
  disabled?: boolean;
}

const initialData: ICol = {
  leftValue: '',
  rightValue: '',
  leftOperator: '',
  rightOperator: '',
  termDay: '',
  checked: false,
  disabled: false
};
function EditTableComp() {
  const [ data, setData ] = useState<ICol[]>([
    {
      leftValue: ['0' , '1', '2'],
      rightValue: '',
      leftOperator: '232',
      rightOperator: '',
      termDay: '',
      checked: false,
      disabled: true
    }
  ]);
  const add = () => {
    setData([ ...data, initialData ]);
  };
  const index = columns.findIndex((col) => col.dataIndex === 'delete');
  columns[index].onClick = (rowIndex: number) => {
    const _data = data.concat();
    _data.splice(rowIndex, 1);
    setData(_data);
  };
  const newData = data.map((d, i) => ({ ...d, disabled: i === 0 ? true : false}));
  const onChange = (errors: any, values: any, allValue: any) => {
    // tslint:disable-next-line
    console.log(values);
  };
  const onInputChange = (values: any) => {
    // tslint:disable-next-line
    setData(values);
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
        viewing={true}
        onError={onError}
        onInputChange={onInputChange}
        onChange={onChange}
        components={{ deleteBtn: DeleteBtn }}
        data={newData}
        columns={columns} />
    </Form>
  );
}

stories.addDecorator(StoryRouter()).add(
  'EditTable',
  () => <EditTableComp />
);

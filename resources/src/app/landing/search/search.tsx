'use client'
export {Search}
import React from 'react';
//import './index.css';
import { Button, Checkbox, Form, Input } from 'antd';
import { Filters } from './filters';



function onFinish (values: any) {
  console.log('Success:', values);
};

function onFinishFailed (errorInfo: any) {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  professor?: string;
  //course?: string;
};

function Search(){
    return(
        <div>
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Professore"
      name="professor"
    >
      <Input />
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Invia
      </Button>
    </Form.Item>
  </Form>
  {Filters()}
  </div>);
    }

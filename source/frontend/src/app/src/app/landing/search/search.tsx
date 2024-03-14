'use client'
export {Search}
import React from 'react';
import { Button, Space, Form, Input, Select } from 'antd';
import { Filters } from './filters';
import { Ordina } from './ordina';
import { Corsi } from '../../../../DB/corsi';
import { Professors } from '../../../../DB/professori';
import { Lezioni } from '../../../../DB/lezioni';



const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Search () {

  var teachers : JSX.Element[] = []
  Professors.professori.forEach(element => {
    teachers.push(<Select.Option key = {element} value = {element}>{element}</Select.Option>)
})
  var courses : JSX.Element[] = []
  Corsi.corsi.forEach(element => {
    courses.push(<Select.Option key = {element} value = {element}>{element}</Select.Option>)
})
  const [form] = Form.useForm();

  const onCourseChange = (value: string) => {
    teachers= Lezioni.getprofessori(value, [])
  };
  const onProfessorChange = (value: string) => {
    Lezioni.getcorsi(value, [])
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    //form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
  };

  return (
    <>
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="professors" label="Professori" rules={[{ required: false }]}>
      <Select
          placeholder="Select a option and change input text above"
          onChange={onProfessorChange}
          allowClear
        >
          {teachers}
        </Select>
      </Form.Item>
      <Form.Item name="course" label="Corso" rules={[{ required: false }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onCourseChange}
          allowClear
        >
          {courses}
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button>
        </Space>
      </Form.Item>
    </Form>
    {Filters()}
    {Ordina()}
    </>
  );
};

export default Search;
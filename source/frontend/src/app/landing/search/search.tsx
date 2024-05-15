'use client'
export {Search}
import React, { useState } from 'react';
import { Button, Space, Form, AutoComplete } from 'antd';
import { Filters } from './filters';
import { Ordina } from './ordina';
import { Lezioni } from '../../../../DB/lezioni';
import { Reviews } from './reviews';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


function Search () {

  const [teachersState, ProfessorChange] = useState(Lezioni.getprofessori())

  const [coursesState, CourseChange] = useState(Lezioni.getcorsi());
  const [course, setCourse] = useState("")
  const [professor, setProfessor] = useState("")
  
  const [form] = Form.useForm();

  const onCourseChange = (value: string) => {
    ProfessorChange(Lezioni.getprofessori(value))
  };
  const onProfessorChange = (value: string) => {
    CourseChange(Lezioni.getcorsi(value))

  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    CourseChange(Lezioni.getcorsi())
    ProfessorChange(Lezioni.getprofessori())
    form.resetFields();
  };

  const onFill = () => {
    //form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
  };


  return(
    <>
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item id = "professori" name="professors" label="Professori" rules={[{ required: false }]}>
      <AutoComplete
          value={professor}
          onSelect={(e) => {
            setProfessor(e)
            onProfessorChange(e)
          }}
          allowClear
          options={teachersState}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        >
        </AutoComplete>
      </Form.Item>
      <Form.Item id = "corsi" name="course" label="Corso" rules={[{ required: false }]}>
        <AutoComplete
          value={course}
          onSelect ={(e) => {
            setCourse(e)
            onCourseChange(e)
          }}
          options={coursesState}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }>
        </AutoComplete>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Cerca
          </Button>
          <Button htmlType="submit"
                  onClick={onReset}>
            Reset
          </Button>
          {Filters()}
          {Ordina()}
        </Space>
      </Form.Item>
    </Form>
    {/*Reviews()*/}
    </>
  )
};

export default Search;
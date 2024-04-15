'use client'
export {Search}
import { ReactDOM } from 'react';
import React, { useState } from 'react';
import { Button, Space, Form, AutoComplete, Select, Empty } from 'antd';
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

/*function Search () {

var empty : String[] = []
const [teachersState, TeacherChange] = useState(empty);
Professors.professori.forEach(element => {
    teachersState.push(element)
})
const [coursesState, CourseChange] = useState(empty);
Corsi.corsi.forEach(element => {
  coursesState.push(element)
})
  const [form] = Form.useForm();
  const [corso, getCorso] = useState("");
  const [professore, getProfessore] = useState("");
  const onCourseChange = () => {
    let list : String[] = []
    Lezioni.lezioni.forEach(element => {
      if (corso==element.corso){
        list.push(element.professore)
      }
    });
    CourseChange(list)
  };
  const onProfessorChange = (value: string) => {
    let list : String[] = []
    Lezioni.lezioni.forEach(element => {
      if (value==element.professore){
        list.push(element.corso)
      }
    });
    //TeacherChange(professore)
  };

  var courses : String[] = []
  Corsi.corsi.forEach(element => {
    courses.push(element)
})
  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
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
          placeholder="Select a option and change input text above"
          value={professore}
          onChange={()=>{
            var size = coursesState.length
            for(var i =0; i<size; i++){
              coursesState.pop();
            }
            Lezioni.lezioni.forEach(element => {
              if (professore == element.professore){
                coursesState.push(element.corso)
              }
            })
          }}
          allowClear
        >
          {teachersState}
        </AutoComplete>
      </Form.Item>
      <Form.Item id = "corsi" name="course" label="Corso" rules={[{ required: false }]}>
        <Select
          placeholder="Select a option and change input text above"
          value={corso}
          onChange={onCourseChange}
          allowClear>
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
  )*/
  
function Search () {

  var teachers : JSX.Element[] = []
  
  Professors.professori.forEach(element => {
    teachers.push(<Select.Option key = {element} value = {element}>{element}</Select.Option>)
  })

  const [teachersState, ProfessorChange] = useState(teachers);

  var courses : JSX.Element[] = []

  Corsi.corsi.forEach(element => {
    courses.push(<Select.Option key = {element} value = {element}>{element}</Select.Option>)
  })

  const [coursesState, CourseChange] = useState(courses);
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
      <Select
          placeholder="Select a option and change input text above"
          value={professor}
          onChange={(e) => {
            setProfessor(e)
            onProfessorChange(e)
          }}
          allowClear
        >
          {teachersState}
        </Select>
      </Form.Item>
      <Form.Item id = "corsi" name="course" label="Corso" rules={[{ required: false }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={(e) => {
            setCourse(e)
            onCourseChange(e)
          }}
          allowClear>
          {coursesState}
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
  )
};

export default Search;
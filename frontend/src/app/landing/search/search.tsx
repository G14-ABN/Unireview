export {Search}
import React, { useState, useEffect } from 'react';
import { getReviews } from '@/app/connect/recensione';
import { Button, Space, Form, AutoComplete } from 'antd';
import { Filters } from './filters';
import { Ordina } from './ordina';
import { init, getcorsi, getprofessori} from '../../connect/lezioni';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Search () {

  const [reviews, setReviews] = useState<React.JSX.Element[]>()

  const [teachersState, ProfessorChange] = useState<{value:string}[]>()

  const [coursesState, CourseChange] = useState<{value:string}[]>();

  useEffect(() => {
    (async () => {
      try {
        // await async "fetchBooks()" function
        const res =await init()
        ProfessorChange(res.professori)
        CourseChange(res.corsi)
      } catch (err) {
        console.log('Error occured when fetching');
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        // await async "fetchBooks()" function
        const res =await getReviews(professor, course)
        setReviews(res)
      } catch (err) {
        console.log('Error occured when fetching');
      }
    })();
  }, []); 
  const [course, setCourse] = useState("")
  const [professor, setProfessor] = useState("")
  
  const [form] = Form.useForm();

  const onCourseChange = (value: string) => {
    ProfessorChange(getprofessori(value))
  };
  const onProfessorChange = (value: string) => {
    CourseChange(getcorsi(value))

  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    CourseChange(getcorsi())
    ProfessorChange(getprofessori())
    setCourse("")
    setProfessor("")
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
    {reviews}
    </>
  )
};
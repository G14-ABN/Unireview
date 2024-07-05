export {Search}
import React, { useState, useEffect } from 'react';
// import { SubmitHandler } from 'react-hook-form';
import { getReviews } from '../../connect/recensione';
import { Button, Space, Form, AutoComplete } from 'antd';
import { Filters, FiltersModal } from './filters';
import { Review, returnCollapse } from '../models/review';
import { Order, Ordina } from './ordina';
import { init, getcorsi, getprofessori, isExam, isProfessor} from '../../connect/lezioni';
import { stats } from './stats';
import { GetModal } from '../../areaPersonale/review/modifica';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};



function Search () {

  const [localRev, setRev] = useState<Review[]>([])

  const [statistic, setStats] = useState<React.JSX.Element>()

  const [reviews, setReviews] = useState<React.JSX.Element[]>()

  const [teachersState, ProfessorChange] = useState<{value:string}[]>()

  const [coursesState, CourseChange] = useState<{value:string}[]>();

  const modal = GetModal()

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
        setStats(stats(res))
        setRev(res)
        setReviews(getCol(res))
      } catch (err) {
        console.log('Error occured when fetching');
      }
    })();
  }, []); 
  function getCol(l:Review[]){
    const res : React.JSX.Element[]=[]
    l.forEach((e)=>{
      res.push(returnCollapse(e, modal.setRev, modal.setOp, modal.setVal))
    })
    return res
  }
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

  const ordina = Ordina(fun)

  const onReset = () => {
    Filters.handleCancel()
    ordina.cancel()
    CourseChange(getcorsi())
    ProfessorChange(getprofessori())
    setCourse("")
    setProfessor("")
    form.resetFields();
  };
  async function fun(){
        const res=await getReviews(professor, course)
        const dest:Review[]=[]
        res.forEach(e=>{
          if (Filters.get(e)){
            dest.push(e)
          }
        })
        if (dest.length>0){
        setStats(stats(dest))
        setRev(dest)
        setReviews(getCol(dest))
        }
        else {
          setRev([])
          setStats(undefined)
          setReviews([<div key = "null"/>])
        }
        }

  return(
    <div>
      {modal.mod}
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      onSubmitCapture={fun}
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
          allowClear
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
                  onClick={async ()=>{
                    onReset()
                      const res=await getReviews('','')
                      const dest:Review[]=[]
                      setRev(dest)
                      setReviews(getCol(dest))
                    }
                    }>
            Reset
          </Button>
          {FiltersModal(fun)}
          {ordina.mod}
        </Space>
      </Form.Item>
    </Form>
    <div >{statistic}</div>
    <div >{reviews}</div>
    </div>
  )
};

export {Patch}
import React, { useState } from 'react';
import {
    Modal,Rate,Checkbox,
    Form,Input,InputNumber,Radio, AutoComplete
} from 'antd';
import { getcorsi, getprofessori } from '@/app/en/connect/lezioni';
import { UtenteAutenticato } from '../users/utenteAutenticato';
const { TextArea } = Input;

class Patch{

  static modal = <Modal/>
  private static setOpen : React.Dispatch<React.SetStateAction<boolean>>=()=>{}
  private static setVoto : React.Dispatch<React.SetStateAction<boolean>>=()=>{}
  private static setReview : React.Dispatch<React.SetStateAction<{
    data: string;
    professore: string;
    esame: string;
    valutazioneProfessore: number;
    valutazioneFattibilita: number;
    valutazioneMateriale: number;
    testo: string;
    tentativo: number;
    voto: number;
    frequenza: string;
    anonima: boolean;
}>>=()=>{}
  private static id = ""
  private static review = {
    data : '',
    professore: '',
    esame: '',
    valutazioneProfessore: 0,
    valutazioneFattibilita: 0,
    valutazioneMateriale: 0,
    testo: '',
    tentativo: 0,
    voto: 17,
    frequenza: '',
    anonima: false
  }

  static handle(){
    const XMLHttpRequest = require('xhr2');
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", "http://localhost:8080/api/review/"+Patch.id, true);
    xhr.setRequestHeader('Authorization', UtenteAutenticato.token);
    xhr.setRequestHeader("Content-Type", 'application/json')
    /*xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      window.alert('Recensione eliminata correttamente')
      location.reload()
      console.log("recensione eliminata correttamente")// Request finished. Do processing here.
    } else {
      if (allert ==0){
        window.alert('Errore di autenticazione, effettuare di nuovo il login')
        allert++;
      }
    }
    };*/
    xhr.send(JSON.stringify(Patch.review))
    location.reload()
    //xhr.send(JSON.stringify({reviewId:Elimina.id, user:UtenteAutenticato.email}))
}
  static patch(id:string, rev : {
    data: string;
    professore: string;
    esame: string;
    valutazioneProfessore: number;
    valutazioneFattibilita: number;
    valutazioneMateriale: number;
    testo: string;
    tentativo: number;
    voto: number;
    frequenza: string;
    anonima: boolean;
}){
    console.log('Patch')
    this.id=id
    this.review= rev
    this.setReview(rev)
    this.setOpen(true)
    this.setVoto(rev.voto<=17)
  }

  static getModal(){
    const [open, setOpen] = useState(false)
    Patch.setOpen=setOpen 
  function onFinish (values: any) {
    console.log('Success:', values);
  };
  
  function onFinishFailed (errorInfo: any) {
    console.log('Failed:', errorInfo);
  };  
  const onReset = () => {
    setFormData(Patch.review)
    CourseChange(getcorsi())
    ProfessorChange(getprofessori())
    form.resetFields();
  };
  const onResetCourse = () => {
    CourseChange(getcorsi())
    ProfessorChange(getprofessori())
  };
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true); 
    Patch.setVoto=setComponentDisabled     
    const handleOk = () => {
        Patch.review=reviews
      Patch.handle()
    };
    const handleCancel = () => {
      onReset();
      Patch.setOpen(false)
    };
    const [reviews, setFormData] = useState(Patch.review);
    Patch.setReview=setFormData
    const [teachersState, ProfessorChange] = useState<{value:string}[]>()

    const [coursesState, CourseChange] = useState<{value:string}[]>();
  
    const [form] = Form.useForm();

    const onCourseChange = (value: string) => {
      ProfessorChange(getprofessori(value))
    };
    const onProfessorChange = (value: string) => {
      CourseChange(getcorsi(value))
    };
    return <Modal title="Edit review" 
        okText="Edit"
        cancelText="Cancel"
        open={open} 
        onOk={()=>{
          handleOk()
          }
        } onCancel={handleCancel}>
        <Form
      labelCol={{ span: 4 }}
      form = {form}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      //disabled={componentDisabled}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name="Professor" 
      label="Professor " >
        <AutoComplete
            defaultValue={reviews.professore}
          onClear={onResetCourse}
          onChange={(e)=>{
            reviews.professore = e
            setFormData(reviews)
          }}
          value={reviews.professore}
          onSelect={(e) => {
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
    <Form.Item name="Course" label="Course ">
      <AutoComplete
      defaultValue={reviews.esame}
      onClear={onResetCourse}
        onChange={(e)=>{
          reviews.esame = e
          setFormData(reviews)
        }}
        value={reviews.esame}
        onSelect ={(e) => {
          onCourseChange(e)
        }}
        allowClear
        options={coursesState}
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }>
      </AutoComplete>
    </Form.Item>
      <Form.Item name="professor rate" label="Professor ">
        <Rate 
        defaultValue={reviews.valutazioneProfessore}
          value = {reviews.valutazioneProfessore}
          onChange={(e)=>{
            reviews.valutazioneProfessore = e
            setFormData(reviews)
          }}/>
      </Form.Item>
      <Form.Item name="Easiness rate" label="Easiness ">
        <Rate 
        defaultValue={reviews.valutazioneFattibilita}
        value = {reviews.valutazioneFattibilita}
        onChange={(e)=>{
          reviews.valutazioneFattibilita = e
          setFormData(reviews)
        }}/>
      </Form.Item>
      <Form.Item  name="Material rate" label="Material ">
        <Rate value = {reviews.valutazioneMateriale}
        defaultValue={reviews.valutazioneMateriale}
        onChange={(e)=>{
          reviews.valutazioneMateriale = e
          setFormData(reviews)
        }}/>
      </Form.Item>
      <Form.Item name="Review" label="Review ">
        <TextArea rows={4} 
        defaultValue={reviews.testo}
        value={reviews.testo}
        onChange ={(e)=>{
          const {value : inputValue} = e.target
          reviews.testo = inputValue
          setFormData(reviews)
        }}/>
      </Form.Item>
      <Checkbox
      name="Show score"
      checked={!componentDisabled}
      onChange={(e) => {
        setComponentDisabled(!e.target.checked)
        reviews.voto=17
        reviews.tentativo=0
      }
    }
    >Show score
    </Checkbox>
      <Form.Item  name="Score"label="Score " rules={[{ required: !componentDisabled, 
        message: "Inserirt final score" }]}>
        <InputNumber
        defaultValue={(componentDisabled? undefined:reviews.voto)}
        onChange={(e)=>{
          if (e != null)
          {reviews.voto = e
          setFormData(reviews)}
        }}
        value={reviews.voto} 
        disabled={componentDisabled}
        max={31}
        min= {18}/>
      </Form.Item>
      <Form.Item name="Attempt" label="N. attempt " rules= {[{required: !componentDisabled}]}>
        <InputNumber
        defaultValue={(componentDisabled? undefined:reviews.voto)}
        onChange={(e)=>{
          if (e != null)
          {reviews.tentativo = e
          setFormData(reviews)}
        }} 
        value={reviews.tentativo}
        disabled={componentDisabled} min = {0}/>
      </Form.Item>
      <Form.Item initialValue={reviews.frequenza} rules={[{required:true}]} name="Attendency" label="Frequenza">
        <Radio.Group defaultValue={true} value={reviews.frequenza}
          onChange={(e)=>{
            if (e.target.value != null)
            {reviews.frequenza = e.target.value
            setFormData(reviews)}
          }}>
          <Radio checked={reviews.frequenza=="0%"} value="0%"> {"0%"} </Radio>
          <Radio checked={reviews.frequenza=="<50%"}value="<50%"> {"<50%"} </Radio>
          <Radio checked={reviews.frequenza==">50%"}value=">50%"> {">50%"} </Radio>
        </Radio.Group>
      </Form.Item>
      <Checkbox name="anonymous"
      checked={reviews.anonima}
      onChange={(e)=>{
        reviews.anonima=e.target.checked
      }} 
      value={reviews.anonima}
      >Anonymous
      </Checkbox>
      </Form>
        </Modal>
  }
}
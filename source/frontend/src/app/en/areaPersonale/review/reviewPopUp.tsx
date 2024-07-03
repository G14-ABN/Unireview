import React, { useState, useEffect } from 'react';
import {
    Modal,Button,Rate,Checkbox,
    Form,Input,InputNumber,Radio, AutoComplete, Space
} from 'antd';
export {PopUp};
import { init } from '../../connect/lezioni';
import { getcorsi, getprofessori, isExam, isProfessor } from '../../connect/lezioni';
import { UtenteAutenticato } from '../users/utenteAutenticato';
const { TextArea } = Input;

function PopUp(){
  const [teachersState, ProfessorChange] = useState<{value:string}[]>([])

  const [coursesState, CourseChange] = useState<{value:string}[]>([]);

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

  const [form] = Form.useForm();

  const rev= {
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

  const [reviews, setFormData] = useState(rev);
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);      
  
    const [isModalOpen, setIsModalOpen] = useState(false);

  function onFinish (values: any) {
    console.log('Success:', values);
  };
  
  function onFinishFailed (errorInfo: any) {
    console.log('Failed:', errorInfo);
  };
 
  
  const handleSubmit =()=>{
    const XMLHttpRequest = require('xhr2');
    const xhr = new XMLHttpRequest();
    
    xhr.open("POST", "BASE_URI/api/review", true);
    xhr.setRequestHeader('Authorization', new URLSearchParams(window.location.search).get('token'));
    /*xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      window.alert('Recensione caricata correttamente')
      console.log("recensione caricata correttamente")// Request finished. Do processing here.
      location.reload()
    } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 403) {
      window.alert('Errore di autenticazione, effetturare di nuovo il login')
      console.log("Errore di autenticazione, effetturare di nuovo il login")// Request finished. Do processing here.
      location.reload()
    }
    };*/
    xhr.setRequestHeader("Content-Type", 'application/json')
    xhr.send(JSON.stringify(reviews))
  } 
  const onReset = () => {
    CourseChange(getcorsi())
    ProfessorChange(getprofessori())
    form.resetFields();
  };
  const onResetCourse = () => {
    CourseChange(getcorsi())
    ProfessorChange(getprofessori())
  };

    const showModal = () => {
      // if (UtenteAutenticato.bannedUntil.setHours(0,0,0,0)<new Date().setHours(0,0,0,0)){
      onResetCourse()
      setIsModalOpen(true);
      // } else {
      //   window.alert('Impossibile to create a new review')
      // }
    };
    const handleOk = () => {
      reviews.data= new Date().toDateString()
      setFormData(reviews)
      handleSubmit()
      //window.alert('Errore di autenticazione, effettuare di nuovo il login')
      location.reload()
      //setIsModalOpen(false);
      //handleCancel();
    };
    const handleCancel = () => {
      onReset();
      setIsModalOpen(false);
    };

    const onCourseChange = (value: string) => {
      ProfessorChange(getprofessori(value))
    };
    const onProfessorChange = (value: string) => {
      CourseChange(getcorsi(value))
    };
    return (
      <>
        <a onClick={showModal}/>
        <Modal title="New review" 
        okText="Send"
        cancelText="Cancel"
        open={isModalOpen} 
        onOk={()=>{
          if (!isExam(reviews.esame)||!isProfessor(reviews.professore)){
            window.alert("Professor or exam don't exist")
          }else if (reviews.esame!=''&&
            reviews.esame!=''&&
            reviews.frequenza!=''&&
            reviews.valutazioneFattibilita!=0&&
            reviews.valutazioneMateriale!=0&&
            reviews.valutazioneProfessore!=0&&
            ((reviews.voto==17&&reviews.tentativo==0)||(reviews.voto>17&&reviews.tentativo>0))
          ){
          handleOk()
        }else {
          window.alert("Fill every required field")
        }
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
      label="Professor " 
      rules={[{ required: true }]}>
        <AutoComplete
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
    <Form.Item name="Corso" label="Course " rules={[{ required: true }]}>
      <AutoComplete
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
      <Form.Item rules={[{required:true}]} name="Valutazione professore" label="Professor ">
        <Rate 
          value = {reviews.valutazioneProfessore}
          onChange={(e)=>{
            reviews.valutazioneProfessore = e
            setFormData(reviews)
          }}/>
      </Form.Item>
      <Form.Item rules={[{required:true}]} name="Valutazione fattibilità" label="Easiness ">
        <Rate 
        value = {reviews.valutazioneFattibilita}
        onChange={(e)=>{
          reviews.valutazioneFattibilita = e
          setFormData(reviews)
        }}/>
      </Form.Item>
      <Form.Item rules={[{required:true}]} name="Valutazione materiale" label="Material ">
        <Rate value = {reviews.valutazioneMateriale}
        onChange={(e)=>{
          reviews.valutazioneMateriale = e
          setFormData(reviews)
        }}/>
      </Form.Item>
      <Form.Item name="Recensione" label="Review ">
        <TextArea rows={4} 
        value={reviews.testo}
        onChange ={(e)=>{
          const {value : inputValue} = e.target
          reviews.testo = inputValue
          setFormData(reviews)
        }}/>
      </Form.Item>
      <Checkbox
      name="Mostra voto"
      checked={!componentDisabled}
      onChange={(e) => setComponentDisabled(!e.target.checked)}
    >Show score
    </Checkbox>
      <Form.Item  name="Voto"label="Score " rules={[{ required: !componentDisabled, 
        message: "Final score is required" }]}>
        <InputNumber
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
      <Form.Item name="Tentativo" label="N. attempt " rules= {[{required: !componentDisabled}]}>
        <InputNumber
        onChange={(e)=>{
          if (e != null)
          {reviews.tentativo = e
          setFormData(reviews)}
        }} 
        value={reviews.tentativo}
        disabled={componentDisabled} min = {0}/>
      </Form.Item>
      <Form.Item rules={[{required:true}]} name="Frequenza" label="Attendency">
        <Radio.Group value={reviews.frequenza}
          onChange={(e)=>{
            if (e.target.value != null)
            {reviews.frequenza = e.target.value
            setFormData(reviews)}
          }}>
          <Radio value="0%"> {"0%"} </Radio>
          <Radio value="<50%"> {"<50%"} </Radio>
          <Radio value=">50%"> {">50%"} </Radio>
        </Radio.Group>
      </Form.Item>
      <Checkbox name="anonima"
      onChange={(e)=>{
        reviews.anonima=e.target.checked
      }} 
      value={reviews.anonima}
      >Anonymous
      </Checkbox>
      </Form>
        </Modal>
      </>
    )
    }
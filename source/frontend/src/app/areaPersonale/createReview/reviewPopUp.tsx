'use client'
import React, { useState } from 'react';
import dayjs from 'dayjs'
import {
    Modal,Button,Rate,Checkbox,DatePicker,
    Form,Input,InputNumber,Radio, AutoComplete
} from 'antd';
export {PopUp};
import { Lezioni } from '../../../../DB/lezioni';
const { TextArea } = Input;

function PopUp(){

  function onFinish (values: any) {
    console.log('Success:', values);
  };
  
  function onFinishFailed (errorInfo: any) {
    console.log('Failed:', errorInfo);
  };

    const [reviews, setFormData] = useState({
      autore: 'Studente',
      data : dayjs(),
      professore: '',
      esame: '',
      valutazioneProfessore: 0,
      valutazioneFattibilita: 0,
      valutazioneMateriale: 0,
      testo: '',
      tentativo: 0,
      voto: 0,
      frequenza: '',
      anonima: false
    });
 
  
  const handleSubmit =()=>{
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/reviews", true);
    xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log("recensione caricata correttamente")// Request finished. Do processing here.
      }
    };
    xhr.setRequestHeader("Content-Type", 'application/json')
    xhr.send(JSON.stringify(reviews))
  }
    
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);      
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setFormData(reviews)
      handleSubmit()
      location.reload()
      //setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
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

    return (
      <>
        <a onClick={showModal}/>
        <Modal title="Compila recensione" 
        open={isModalOpen} 
        onOk={handleOk} onCancel={handleCancel}>
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
        <Form.Item name="professors" 
        label="Professore " 
        rules={[{ required: true }]}>
          <AutoComplete
            onChange={(e)=>{
              reviews.professore = e
              setFormData(reviews)
            }}
            value={reviews.professore}
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
      <Form.Item name="course" label="Corso " rules={[{ required: true }]}>
        <AutoComplete
          onChange={(e)=>{
            reviews.esame = e
            setFormData(reviews)
          }}
          value={reviews.esame}
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
        <Form.Item rules={[{required:true}]} name="vprof" label="Professore ">
          <Rate 
            value = {reviews.valutazioneProfessore}
            onChange={(e)=>{
              reviews.valutazioneProfessore = e
              setFormData(reviews)
            }}/>
        </Form.Item>
        <Form.Item rules={[{required:true}]} name="vfattibilita" label="Fattibilità ">
          <Rate 
          value = {reviews.valutazioneFattibilita}
          onChange={(e)=>{
            reviews.valutazioneFattibilita = e
            setFormData(reviews)
          }}/>
        </Form.Item>
        <Form.Item rules={[{required:true}]} name="vmateriale" label="Materiale ">
          <Rate value = {reviews.valutazioneMateriale}
          onChange={(e)=>{
            reviews.valutazioneMateriale = e
            setFormData(reviews)
          }}/>
        </Form.Item>
        <Form.Item name="testo" label="Recensione ">
          <TextArea rows={4} 
          value={reviews.testo}
          onChange ={(e)=>{
            const {value : inputValue} = e.target
            reviews.testo = inputValue
            setFormData(reviews)
          }}/>
        </Form.Item>
        <Checkbox
        name="mvoto"
        checked={!componentDisabled}
        onChange={(e) => setComponentDisabled(!e.target.checked)}
      >Mostra voto
      </Checkbox>
        <Form.Item  name="voto"label="Voto " rules={[{ required: !componentDisabled, 
          message: "Inserire il voto del'esame" }]}>
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
        <Form.Item  rules= {[{required: !componentDisabled}]}
         name="data" label="Data ">
          <DatePicker 
          onChange={(e)=>{
            if (e != null)
            {reviews.data = e
            setFormData(reviews)}
          }}
          value={(reviews.data /*instanceof dayjs.Dayjs? reviews.data : null*/)}/>
        </Form.Item>
        <Form.Item name="tentativo" label="N. tentativo ">
          <InputNumber
          onChange={(e)=>{
            if (e != null)
            {reviews.tentativo = e
            setFormData(reviews)}
          }} 
          value={reviews.tentativo}
          disabled={componentDisabled} min = {0}/>
        </Form.Item>
        <Form.Item name="frequenza" label="Frequenza">
          <Radio.Group value={reviews.frequenza}
            onChange={(e)=>{
              if (e.target.value != null)
              {reviews.frequenza = e.target.value
              setFormData(reviews)}
            }}>
            <Radio value="Nessuna"> Nessuna </Radio>
            <Radio value="Rara"> Rara </Radio>
            <Radio value="Occasionale"> Occasionale </Radio>
            <Radio value="Frequente"> Frequente </Radio>
          </Radio.Group>
        </Form.Item>
        <Checkbox name="anonima"
        onChange={(e)=>{
          reviews.anonima=e.target.checked
        }} 
        value={reviews.anonima}
        >Anonima
        </Checkbox>
        {/*<Form.Item>
            <Button name="invia" type="primary" htmlType="submit"
            onClick={()=>{
              setFormData(reviews)
              handleSubmit()
            }}>
            Invia
            </Button>
          </Form.Item>*/}
        </Form>
        </Modal>
      </>
    );
}
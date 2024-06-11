import React, { useState } from 'react';
import {
    Modal,Button,Rate,Checkbox,
    Form,Input,InputNumber,Radio, AutoComplete, Space
} from 'antd';
export {PopUp};
import { getcorsi, getprofessori } from '@/app/connect/lezioni';
import { UtenteAutenticato } from '../users/utenteAutenticato';
const { TextArea } = Input;

function PopUp(){

  function onFinish (values: any) {
    console.log('Success:', values);
  };
  
  function onFinishFailed (errorInfo: any) {
    console.log('Failed:', errorInfo);
  };

    const [reviews, setFormData] = useState({
      data : '',
      professore: '',
      esame: '',
      valutazioneProfessore: 1,
      valutazioneFattibilita: 1,
      valutazioneMateriale: 1,
      testo: '',
      tentativo: 0,
      voto: 17,
      frequenza: "0%",
      anonima: false
    });
 
  
  const handleSubmit =()=>{
    if (UtenteAutenticato.bannedUntil.setHours(0,0,0,0)<new Date().setHours(0,0,0,0)){
    const XMLHttpRequest = require('xhr2');
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/review", true);
    xhr.setRequestHeader('Authorization', new URLSearchParams(window.location.search).get('token'));
    xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      window.alert('Recensione caricata correttamente')
      console.log("recensione caricata correttamente")// Request finished. Do processing here.
      }
    };
    xhr.setRequestHeader("Content-Type", 'application/json')
    xhr.send(JSON.stringify(reviews))
  }else{
    window.alert('Errore nel caricamento')
  }
  location.reload()
  } 
  const onReset = () => {
    CourseChange(getcorsi())
    ProfessorChange(getprofessori())
    form.resetFields();
  };
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);      
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      CourseChange(getcorsi())
      ProfessorChange(getprofessori())
      setIsModalOpen(true);
    };
    const handleOk = () => {
      reviews.data= new Date().toDateString()
      setFormData(reviews)
      handleSubmit()
      //location.reload()
      //setIsModalOpen(false);
      handleCancel();
    };
    const handleCancel = () => {
      onReset();
      setIsModalOpen(false);
    };
    const [teachersState, ProfessorChange] = useState<{value:string}[]>()

    const [coursesState, CourseChange] = useState<{value:string}[]>();
  
    const [form] = Form.useForm();

    const onCourseChange = (value: string) => {
      ProfessorChange(getprofessori(value))
    };
    const onProfessorChange = (value: string) => {
      CourseChange(getcorsi(value))
    };
    if (UtenteAutenticato.bannedUntil>new Date())
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
        <Form.Item name="Professore" 
        label="Professore " 
        rules={[{ required: true }]}>
          <AutoComplete
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
      <Form.Item name="Corso" label="Corso " rules={[{ required: true }]}>
        <AutoComplete
          onChange={(e)=>{
            reviews.esame = e
            setFormData(reviews)
          }}
          value={reviews.esame}
          onSelect ={(e) => {
            onCourseChange(e)
          }}
          options={coursesState}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }>
        </AutoComplete>
      </Form.Item>
        <Form.Item rules={[{required:true}]} name="Valutazione professore" label="Professore ">
          <Rate 
            value = {reviews.valutazioneProfessore}
            onChange={(e)=>{
              reviews.valutazioneProfessore = e
              setFormData(reviews)
            }}/>
        </Form.Item>
        <Form.Item rules={[{required:true}]} name="Valutazione fattibilità" label="Fattibilità ">
          <Rate 
          value = {reviews.valutazioneFattibilita}
          onChange={(e)=>{
            reviews.valutazioneFattibilita = e
            setFormData(reviews)
          }}/>
        </Form.Item>
        <Form.Item rules={[{required:true}]} name="Valutazione materiale" label="Materiale ">
          <Rate value = {reviews.valutazioneMateriale}
          onChange={(e)=>{
            reviews.valutazioneMateriale = e
            setFormData(reviews)
          }}/>
        </Form.Item>
        <Form.Item name="Recensione" label="Recensione ">
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
      >Mostra voto
      </Checkbox>
        <Form.Item  name="Voto"label="Voto " rules={[{ required: !componentDisabled, 
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
        <Form.Item name="Tentativo" label="N. tentativo " rules= {[{required: !componentDisabled}]}>
          <InputNumber
          onChange={(e)=>{
            if (e != null)
            {reviews.tentativo = e
            setFormData(reviews)}
          }} 
          value={reviews.tentativo}
          disabled={componentDisabled} min = {0}/>
        </Form.Item>
        <Form.Item rules={[{required:true}]} name="Frequenza" label="Frequenza">
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
        >Anonima
        </Checkbox>
        <Form.Item>
        <Button htmlType="submit"
                  onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
        </Form>
        </Modal>
      </>
    )
    else return (<>
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
        <Form.Item name="Professore" 
        label="Professore " 
        rules={[{ required: true }]}>
          <AutoComplete
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
      <Form.Item name="Corso" label="Corso " rules={[{ required: true }]}>
        <AutoComplete
          onChange={(e)=>{
            reviews.esame = e
            setFormData(reviews)
          }}
          value={reviews.esame}
          onSelect ={(e) => {
            onCourseChange(e)
          }}
          options={coursesState}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }>
        </AutoComplete>
      </Form.Item>
        <Form.Item rules={[{required:true}]} name="Valutazione professore" label="Professore ">
          <Rate 
            value = {reviews.valutazioneProfessore}
            onChange={(e)=>{
              reviews.valutazioneProfessore = e
              setFormData(reviews)
            }}/>
        </Form.Item>
        <Form.Item rules={[{required:true}]} name="Valutazione fattibilità" label="Fattibilità ">
          <Rate 
          value = {reviews.valutazioneFattibilita}
          onChange={(e)=>{
            reviews.valutazioneFattibilita = e
            setFormData(reviews)
          }}/>
        </Form.Item>
        <Form.Item rules={[{required:true}]} name="Valutazione materiale" label="Materiale ">
          <Rate value = {reviews.valutazioneMateriale}
          onChange={(e)=>{
            reviews.valutazioneMateriale = e
            setFormData(reviews)
          }}/>
        </Form.Item>
        <Form.Item name="Recensione" label="Recensione ">
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
      >Mostra voto
      </Checkbox>
        <Form.Item  name="Voto"label="Voto " rules={[{ required: !componentDisabled, 
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
        <Form.Item name="Tentativo" label="N. tentativo " rules= {[{required: !componentDisabled}]}>
          <InputNumber
          onChange={(e)=>{
            if (e != null)
            {reviews.tentativo = e
            setFormData(reviews)}
          }} 
          value={reviews.tentativo}
          disabled={componentDisabled} min = {0}/>
        </Form.Item>
        <Form.Item rules={[{required:true}]} name="Frequenza" label="Frequenza">
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
        >Anonima
        </Checkbox>
        <Form.Item>
        <Button htmlType="submit"
                  onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
        </Form>
        </Modal>
      </>);
}
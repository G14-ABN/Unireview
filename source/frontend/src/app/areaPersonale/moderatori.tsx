import React, { useState } from 'react';
import {Modal,Form,Input} from 'antd';
import { UtenteAutenticato, GetToken } from './users/utenteAutenticato';
import { jwtDecode } from 'jwt-decode';
export {Mod};
const { TextArea } = Input;

const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;

function Mod(){

  function onFinish (values: any) {
    console.log('Success:', values);
  };
  
  function onFinishFailed (errorInfo: any) {
    console.log('Failed:', errorInfo);
  };

    const [message, setFormData] = useState<string>("");
 
  
  const handleSubmit =()=>{
    const XMLHttpRequest = require('xhr2');
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${BACKEND_URI}/api/send-email`, true);
    xhr.setRequestHeader('Authorization', GetToken());
    xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      window.alert('Messaggio inviato correttamente')
      console.log("Messaggio inviato correttamente")// Request finished. Do processing here.
      }
    };
    xhr.setRequestHeader("Content-Type", 'application/json')
    xhr.send(JSON.stringify({text:message}))
  } 
  const onReset = () => {
    setFormData("")
    form.resetFields();
  };   
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
      
    };
    const handleOk = () => {
      setFormData(message)
      handleSubmit()
      //location.reload()
      //setIsModalOpen(false);
      handleCancel();
    };
    const handleCancel = () => {
      onReset();
      setIsModalOpen(false);
    };
  
    const [form] = Form.useForm();

    return (
      <>
        <a onClick={showModal}/>
        <Modal title="Contatta moderatore" 
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
      <Form.Item name="Messaggio" label="Messaggio ">
        <TextArea rows={4} 
        value={message}
        onChange ={(e)=>{
          setFormData(e.target.value)
        }}/>
      </Form.Item>
      </Form>
        </Modal>
      </>
    )
    }

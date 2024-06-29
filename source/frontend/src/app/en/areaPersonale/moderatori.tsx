import React, { useState } from 'react';
import {Modal,Form,Input} from 'antd';
import { UtenteAutenticato } from './users/utenteAutenticato';
import { jwtDecode } from 'jwt-decode';
export {mod};
const { TextArea } = Input;

function mod(){

  function onFinish (values: any) {
    console.log('Success:', values);
  };
  
  function onFinishFailed (errorInfo: any) {
    console.log('Failed:', errorInfo);
  };

    const [message, setFormData] = useState<string>();
 
  
  const handleSubmit =()=>{
    const XMLHttpRequest = require('xhr2');
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/send-email", true);
    xhr.setRequestHeader('Authorization', new URLSearchParams(window.location.search).get('token'));
    xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      window.alert('Text sent successfully')
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
        <Modal title="Contact moderator" 
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
      <Form.Item name="Text" label="Text ">
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
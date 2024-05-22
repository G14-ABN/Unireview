'use client'
export {Ordina}
import { useState } from 'react';
import React from 'react';
import {
    Form,
    Radio,
Modal, 
Button,
Space} from 'antd';



function Ordina(){


  function onFinish (values: any) {
    console.log('Success:', values);
  };
  
  function onFinishFailed (errorInfo: any) {
    console.log('Failed:', errorInfo);
  };      
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };


  return (
    <>
      <Button onClick={showModal}>
        Ordina per
      </Button>
      <Modal title="Ordina per" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      //disabled={componentDisabled}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="">
        <Radio.Group>
          <Radio value="Min-max"> {'Min -> Max'} </Radio>
          <Radio value="Max-min"> {'Max -> Min'} </Radio>
        </Radio.Group>
        <Space/>
          <Radio.Group>
            <Radio value="Data"> Data </Radio>
            <Radio value="Voto esame"> Voto esame </Radio>
            <Radio value="Voto recensione"> Voto recensione </Radio>
          </Radio.Group>
        </Form.Item>
    </Form>
      </Modal>
    </>
  );
}
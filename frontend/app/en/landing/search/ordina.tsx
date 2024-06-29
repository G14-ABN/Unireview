'use client'
export {Order}
import { Review } from '../models/review';
import { useState } from 'react';
import React from 'react';
import {
    Form,
    Radio,
Modal, 
Button,
Space} from 'antd';
import { useForm } from 'react-hook-form';


class Order{
  static min=true 
  static field="Data"
  static set(){
    Order.min=true
    Order.field="Data"
  }
  static sort(a:Review, b: Review){
    let res = 1
    if (Order.field=="Date"){
      a.data=(typeof a.data=="string"? new Date(a.data) : a.data)
      b.data=(typeof b.data=="string"? new Date(b.data) : b.data)
      res = (a.data.setHours(0,0,0,0)<b.data.setHours(0,0,0,0)? 1:-1)
    }else if (Order.field=="Exam score"){
      res = a.voto.valueOf()-b.voto.valueOf()
    } else {
      res= a.average()-b.average()
    }
    if (Order.min){
      return res
    } else {
      return -res
    }
  }
static handleCancel = ()=>{}
static ordina(){


  function onFinish (values: any) {
    console.log('Success:', values);
  };
  
  function onFinishFailed (errorInfo: any) {
    console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm()      
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    Order.handleCancel = () => {
      form.resetFields()
      Order.set()
      setIsModalOpen(false);
    };


  return (
    <>
      <Button onClick={showModal} >
        Order by
      </Button>
      <Modal title="Order by"
       open={isModalOpen} 
       onOk={handleOk} 
       onCancel={Order.handleCancel}
       okText="Confirm"
       cancelText="Cancel">
    <Form
    form = {form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      //disabled={componentDisabled}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name = "min"label="">
        <Radio.Group onChange={(e)=>{
          Order.min=e.target.value=="Min-max"
        }}>
          <Radio value="Min-max"> {'Min -> Max'} </Radio>
          <Radio value="Max-min"> {'Max -> Min'} </Radio>
        </Radio.Group>
        </Form.Item>
        <Form.Item name = "by">
          <Radio.Group onChange={(e)=>{
            Order.field=e.target.value
          }}>
            <Radio value="Date"> Date </Radio>
            <Radio value="Exam score"> Exam score </Radio>
            <Radio value="Review rate"> Review rate </Radio>
          </Radio.Group>
        </Form.Item>
    </Form>
      </Modal>
    </>
  );
}
}
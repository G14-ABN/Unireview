'use client'
export {Order}
export {Ordina}
import { Review } from '../models/review';
import { useState } from 'react';
import React from 'react';
import {
    Form,
    Radio,
Modal, 
Button,
Space} from 'antd';


class Order{
  static min=true 
  static field="Data"
  static set(){
    Order.min=true
    Order.field="Data"
  }
  static sort(a:Review, b: Review){
    let res = 1
    if (Order.field=="Data"){
      a.data=(typeof a.data=="string"? new Date(a.data) : a.data)
      b.data=(typeof b.data=="string"? new Date(b.data) : b.data)
      res = (a.data.setHours(0,0,0,0)<b.data.setHours(0,0,0,0)? 1:-1)
    }else if (Order.field=="Voto esame"){
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
}
function Ordina(){


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
    const handleCancel = () => {
      form.resetFields()
      Order.set()
      setIsModalOpen(false);
    };
    var modal = 
    <>
      <Button onClick={showModal} >
        Order by
      </Button>
      <Modal title="Order by"
       open={isModalOpen} 
       onOk={handleOk} 
       onCancel={handleCancel}
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
      <Form.Item name = {"crit"}label="">
        <Radio.Group name = "min"onChange={(e)=>{
          Order.min=e.target.value=="Min-max"
        }}>
          <Radio value="Min-max"> {'Min -> Max'} </Radio>
          <Radio value="Max-min"> {'Max -> Min'} </Radio>
        </Radio.Group>
        <Space/>
          <Radio.Group name = "criteria" onChange={(e)=>{
            Order.field=e.target.value
          }}>
            <Radio value="Data"> Date </Radio>
            <Radio value="Voto esame"> Score </Radio>
            <Radio value="Voto recensione"> Rate </Radio>
          </Radio.Group>
        </Form.Item>
    </Form>
      </Modal>
    </>;
    return {mod: modal, cancel:handleCancel}
}

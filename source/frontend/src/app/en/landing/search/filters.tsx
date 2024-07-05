'use client'
export {Filters}
export {FiltersModal}
import React from 'react';
import { useState } from 'react';
//import './index.css';
import {
    Rate,
    DatePicker,
    Form,
    Radio,
    Slider,
    SliderSingleProps,
Modal, Button } from 'antd';
import { Review } from '../models/review';;


class Filters{

  static frequenza = 0
  static tentativi = -1
  static data = new Date("01/01/2023")
  static minVoto=0
  static min=17
  static max= 31
  static reset(){
    Filters.frequenza=0
    Filters.tentativi=-1
    Filters.data= new Date("01/01/2023")
    Filters.min=17
    Filters.max=31
  }
  static GetFrequenza(s :string){
    if (s=="0%"){
      return 0
    }else if (s=="<50%"){
      return 1
    } else {
      return 2
    }
  }
  static get(r: Review){
    if (r.average()<Filters.minVoto){
      return false
    }
    if (Filters.GetFrequenza(r.frequenza)<Filters.frequenza){
      return false
    }
    if (Filters.tentativi!=-1&&r.tentativo!=undefined){
      if (r.tentativo.valueOf()>Filters.tentativi) return false
    }
    if (r.voto.valueOf()<Filters.min||r.voto.valueOf()>Filters.max){
      return false
    }
    const data=(typeof r.data=="string"?new Date(r.data):r.data)
    if (data.setHours(0,0,0,0)<Filters.data.setHours(0,0,0,0)){
      return false
    }
    return true
  }

  static handleCancel=()=>{}
}
  
  function FiltersModal(fun : ()=>void){
    const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (value) => (value==17?"No mark":value);
    const [form]=Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    }; 
    const handleOk = () => {
        fun()
      setIsModalOpen(false);
    };
    Filters.handleCancel = () => {
      Filters.reset()
      form.resetFields()
      setIsModalOpen(false);
    };

  return (
    <>
      <Button onClick={showModal}>
        Filter by
      </Button>
      <Modal title="Filter by" 
      open={isModalOpen} 
      onOk={handleOk} 
      onCancel={Filters.handleCancel}
      okText="Confirm"
      cancelText="Cancel">
    <Form form={form}>
            <Form.Item name = "Frequenza" label="Lowest attendency">
            <Radio.Group onChange={(e)=>{
              Filters.frequenza=Filters.GetFrequenza(e.target.value)
            }}>
              <Radio value="0%"> 0% </Radio>
              <Radio value="<50%">{"<50%"} </Radio>
              <Radio value=">50"> {">50%"} </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name = "Tentativo" label="Most attempts">
            <Radio.Group 
            onChange={(e)=>{
              Filters.tentativi=Number.parseInt(e.target.value)
            }}>
              <Radio value="1"> 1 </Radio>
              <Radio value="2"> 2 </Radio>
              <Radio value="3"> 3 </Radio>
              <Radio value="4"> 4 </Radio>
              <Radio value="5"> 5+ </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name = "Data" label="Date">
            <DatePicker onChange={(e):void=>{
              Filters.data= new Date(e.date())
            }}/>
          </Form.Item>
          <Form.Item name = "Voto"label="Lowest rate">
            <Rate onChange={(e)=>Filters.minVoto=e}/>
          </Form.Item>
          <Form.Item name = "Range"label="Score rate">
            <Slider tooltip={{formatter}} min={17} max = {31} range defaultValue={[17, 31]}
            onChange={(e)=>{
              Filters.min=e[0]
              Filters.max=e[1]
            }}/>
          </Form.Item>
          </Form>
      </Modal>
    </>
  );
}

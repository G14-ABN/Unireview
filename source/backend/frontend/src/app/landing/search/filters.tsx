'use client'
export {Filters}
import React from 'react';
import { useState } from 'react';
//import './index.css';
import {
    Rate,
    DatePicker,
    Form,
    Radio,
    Slider,
Modal, Button } from 'antd';


function Filters(){      
  
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
        Filtra per
      </Button>
      <Modal title="Filtra per" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <Form>
            <Form.Item label="Frequenza minima">
            <Radio.Group>
              <Radio value="0%"> Non frquentante </Radio>
              <Radio value=">25%"> Frequenza rara </Radio>
              <Radio value=">50"> Frquenza occasionale </Radio>
              <Radio value=">75"> Frequentante </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Tentativi massimi">
            <Radio.Group>
              <Radio value="one"> 1 </Radio>
              <Radio value="two"> 2 </Radio>
              <Radio value="three"> 3 </Radio>
              <Radio value="four"> 4 </Radio>
              <Radio value="five plus"> 5+ </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Data">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Voto minimo recensione">
            <Rate />
          </Form.Item>
          <Form.Item label="Range voti esami">
            <Slider min={18} max = {31} range defaultValue={[18, 31]}/>
          </Form.Item>
          </Form>
      </Modal>
    </>
  );
}
'use client'
export {Filters}
import React from 'react';
//import './index.css';
import {
    Rate,
    DatePicker,
    Form,
    Radio,
    Slider,
Collapse } from 'antd';



function Filters(){

    return (
        <Collapse items = {[{label : "Filtra per", children : <div>
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
          <Form.Item label="DatePicker">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Voto minimo recensione">
            <Rate />
          </Form.Item>
          <Form.Item label="Voto minimo esame">
            <Slider />
          </Form.Item>
          </div>
        }]}/>
    );
}
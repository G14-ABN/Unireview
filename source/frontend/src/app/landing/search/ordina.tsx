'use client'
export {Ordina}
import React from 'react';
//import './index.css';
import {
    Form,
    Radio,
Collapse } from 'antd';



function Ordina(){

    return (
        <Collapse items = {[{label : "Ordina per", children : <div>
            <Form.Item label="">
            <Radio.Group>
              <Radio value="Min-max"> {'Min -> Max'} </Radio>
              <Radio value="Max-min"> {'Max -> Min'} </Radio>
            </Radio.Group>
            </Form.Item>
            <Form.Item label="">
            <Radio.Group>
              <Radio value="Data"> Data </Radio>
              <Radio value="Voto esame"> Voto esame </Radio>
              <Radio value="Voto recensione"> Voto recensione </Radio>
            </Radio.Group>
          </Form.Item>
          </div>
        }]}/>
    );
}
'use client'
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Modal,Button,Rate,Checkbox,DatePicker,
    Form,Input,InputNumber,Radio
} from 'antd';
//import './index.css';
export {PopUp};

interface review {
    autore: string;
    professore: string;
    corso: string;
    data: Date;
    valutazioneProfessore : Number;
    valutazioneFattibilita : Number;
    valutazioneMateriale : Number;
    testo :string;
    frequenza :Number;
    voto: Number;
    anonima: Boolean;
}
const { TextArea } = Input;

function onFinish (values: any) {
    console.log('Success:', values);
  };
  
  function onFinishFailed (errorInfo: any) {
    console.log('Failed:', errorInfo);
  };

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
function PopUp() {
    
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);      
  
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
        <Button type="primary" onClick={showModal}>
          Compila recensione
        </Button>
        <Modal title="Compila recensione" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        //disabled={componentDisabled}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Professore">
          <Input />
        </Form.Item>
        <Form.Item label="Corso">
          <Input />
        </Form.Item>
        <Form.Item label="Data">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Professore">
          <Rate />
        </Form.Item>
        <Form.Item label="Fattibilità">
          <Rate />
        </Form.Item>
        <Form.Item label="Materiale">
          <Rate />
        </Form.Item>
        <Form.Item label="Recensione">
          <TextArea rows={4} />
        </Form.Item>
        <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >Mostra voto
      </Checkbox>
        <Form.Item label="Voto" rules={[{ required: true, message: "Inserire il voto del'esame" }]}>
          <InputNumber disabled={componentDisabled}/>
        </Form.Item>
        <Form.Item label="N. tentativo">
          <InputNumber disabled={componentDisabled}/>
        </Form.Item>
        <Form.Item label="Frequenza">
          <Radio.Group>
            <Radio value="Nessuna"> Nessuna </Radio>
            <Radio value="Rara"> Rara </Radio>
            <Radio value="Occasionale"> Occasionale </Radio>
            <Radio value="Frequente"> Frequente </Radio>
          </Radio.Group>
        </Form.Item>
        <Checkbox
        >Anonima
        </Checkbox>
        {/*<Form.Item>
            <Button type="primary" htmlType="submit">
            Invia
            </Button>
        </Form.Item>*/}
        </Form>
        </Modal>
      </>
    );
}

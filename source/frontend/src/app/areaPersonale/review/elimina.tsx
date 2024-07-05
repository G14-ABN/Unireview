export {Elimina}
import React, { useState } from 'react';
import {
    Modal,Button
} from 'antd';
import { UtenteAutenticato, GetToken } from '../users/utenteAutenticato';

const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;

class Elimina{
  /*private static open = false
  static modal = <Modal
        open={Elimina.open}
        okText="Elimina"
        cancelText="Annulla"
        onOk={this.handle}
        onCancel={()=>Elimina.setOpen(false)}>
          Sicuro di voler cancellare la recensione?
        </Modal>
  static setOpen : React.Dispatch<React.SetStateAction<boolean>> = ()=>{}
  private static id = ""*/
  static handle(id:string){
    const XMLHttpRequest = require('xhr2');
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${BACKEND_URI}/api/review/`+id, true);
    xhr.setRequestHeader('Authorization', GetToken());
    xhr.setRequestHeader("Content-Type", 'application/json')
    xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      window.alert('Recensione eliminata correttamente')
      console.log("recensione eliminata correttamente")// Request finished. Do processing here.
      location.reload()
    } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 403) {
      window.alert('Errore di autenticazione, effetturare di nuovo il login')
      console.log("Errore di autenticazione, effetturare di nuovo il login")// Request finished. Do processing here.
      location.reload()
    }
    };
    xhr.send()
    //xhr.send(JSON.stringify({reviewId:Elimina.id, user:UtenteAutenticato.email}))
}
  /*static remove(id:string){
    console.log('Elimina')
    this.id=id
    this.setOpen(true)
  }

  static button(id:string){
    return <Button onClick={()=>Elimina.remove(id)}>Elimina</Button>
  }

  constructor(){
    const [open, setOpen] = useState(false)
    Elimina.open=open
    //const [modal, setMoodal]= useState(Elimina.modal)
    //Elimina.modal=modal
    Elimina.setOpen=setOpen
    setMoodal(
      <Modal
        open={open}
        okText="Elimina"
        cancelText="Annulla"
        onOk={Elimina.handle}
        onCancel={()=>setOpen(false)}>
          Sicuro di voler cancellare la recensione?
        </Modal>)
  }*/
}

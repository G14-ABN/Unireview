export {Elimina}
import React, { useState } from 'react';
import {
    Modal,Button
} from 'antd';
import { UtenteAutenticato } from '../users/utenteAutenticato';

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
    xhr.open("DELETE", "http://localhost:8080/api/review/"+id, true);
    xhr.setRequestHeader('Authorization', UtenteAutenticato.token);
    xhr.setRequestHeader("Content-Type", 'application/json')
    /*xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      window.alert('Recensione eliminata correttamente')
      location.reload()
      console.log("recensione eliminata correttamente")// Request finished. Do processing here.
    } else {
      if (allert ==0){
        window.alert('Errore di autenticazione, effettuare di nuovo il login')
        allert++;
      }
    }
    };*/
    xhr.send()
    location.reload()
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
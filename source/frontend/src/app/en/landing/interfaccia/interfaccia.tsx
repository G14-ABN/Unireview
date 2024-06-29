'use state'
import {Switch} from 'antd';
export {Interfaccia}
import { Tema } from './tema';
import { Lingua } from './lingua';
import React from 'react';
import { UtenteAutenticato } from '@/app/en/areaPersonale/users/utenteAutenticato';

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", './');
  xhttp.send();
}

function Interfaccia(dark:boolean, 
                     stylesChange:React.Dispatch<React.SetStateAction<boolean>>
){
  const tema = new Tema()
  return (
    <>
      <div>
        <Switch
          checked={!tema.getTema()}
          onClick={()=>{
            tema.change()
            UtenteAutenticato.changeTema()
            stylesChange(!dark)
          }}
          checkedChildren="Light"
          unCheckedChildren="Dark"
            style={{width : '65px'}}
        />
      </div>
      <br/>
      <div>
        <Switch
          //checked={!Tema.getTema()}
          onChange={Lingua.change}
          onClick = {loadDoc}
          checkedChildren="IT"
          unCheckedChildren="EN"
          style={{width : '65px'}}
        />
      </div>
      <br/>
      </>
  );
}
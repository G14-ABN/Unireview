'use state'
import {Button, Switch} from 'antd';
export {Interfaccia}
import { Tema } from './tema';
import { Lingua } from './lingua';
import React from 'react';
import { UtenteAutenticato } from '../../areaPersonale/users/utenteAutenticato';

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", './');
  xhttp.send();
}

function Interfaccia(dark:boolean, 
                     stylesChange:React.Dispatch<React.SetStateAction<boolean>>
){
  return (
    <>
      <div>
        <Switch
          checked={dark}
          onClick={()=>{
            UtenteAutenticato.changeTema()
            stylesChange(!dark)
          }}
          checkedChildren="Light"
          unCheckedChildren="Dark"
            style={{width : '65px'}}
        />
      </div>
      </>
  );
}
'use state'
import {Switch} from 'antd';
export {Interfaccia}
import { Tema } from './tema';
import { Lingua } from './lingua';
import React from 'react';

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", './');
  xhttp.send();
}

function Interfaccia(stylesState:React.CSSProperties[], 
                     stylesChange:React.Dispatch<React.SetStateAction<React.CSSProperties[]>>
){
  const tema = new Tema()
  return (
    <>
      <div>
        <Switch
          checked={!tema.getTema()}
          onClick={()=>{
            tema.change()
            stylesState.forEach(element =>{
              element.color=(tema.getTema()? '#000000':'#ffffff')
              element.backgroundColor=(!tema.getTema()? '#000000':'#ffffff')
              stylesChange(stylesState)
            })
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
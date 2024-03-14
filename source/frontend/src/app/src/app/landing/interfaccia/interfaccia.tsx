'use state'
import {Switch} from 'antd';
export {Interfaccia}
import { Tema } from './tema';
import { Lingua } from './lingua';

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", './');
  xhttp.send();
}

function Interfaccia(){
    return (
      <>
        <div>
          <Switch
            //checked={!Tema.getTema()}
            onChange={Tema.change}
            onClick = {loadDoc}
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
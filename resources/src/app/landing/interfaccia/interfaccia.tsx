'use state'
import {Switch} from 'antd';
export {Interfaccia}
import { Tema } from './tema';
import { Lingua } from './lingua';

function Interfaccia(){
    return (
        <>
          <Switch
            //checked={!Tema.getTema()}
            onChange={Tema.change}
            checkedChildren="Light"
            unCheckedChildren="Dark"
            //style={{padding : '50%'}}
          />
          <Switch
            //checked={!Tema.getTema()}
            onChange={Lingua.change}
            checkedChildren="It"
            unCheckedChildren="En"
            //style={{padding : '50%'}}
          />
        </>
    );
}
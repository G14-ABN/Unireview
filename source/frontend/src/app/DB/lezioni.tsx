export {Lezioni}
import { Professors } from "./professori"  
import { Corsi } from "./corsi"
import { Select } from "antd";


class lezione{
    professore : string
    corso : string
    constructor(professore: string, corso : string){
        this.corso = corso
        this.professore = professore
    }
}

class Lezioni{
    static lezioni=[new lezione('Marchese', 'Reti'),
                    new lezione('Casari', 'Reti'),
                    new lezione('Patrignani', 'Programmazione 2'),
                    new lezione('Brunetti', 'Reti'),
                    new lezione('Bouquet', 'Basi di dati'),
                    new lezione('Bouquet', 'Sistemi informativi'),
                    new lezione('Patrignani', 'Programmazione avanzata')]
    static getprofessori(corso: string | null, list : JSX.Element[]){
        if (corso == null){
            list = []
            Professors.professori.forEach(element => {
                list.push(<Select.Option value = {element}>{element}</Select.Option>)
            })
        } else{
            list.forEach(element => {
                if (element.key !=  corso){
                    list
                }
            });
            
        }
        //this.resprofessori.concat(<Select.Option value = 'ayo'>cunt</Select.Option>)
        return list
    }
    static getcorsi(professore: string | null, list : JSX.Element[]){
        list = []
        if (professore == null){
            Corsi.corsi.forEach(element => {
                list.push(<Select.Option value = {element}>{element}</Select.Option>)
            })
        } else{
            this.lezioni.forEach(element => {
                if (element.professore == professore){
                    list.push(<Select.Option value = {element.corso}>{element.corso}</Select.Option>)
                }
            });
        }
        return list
    }
}
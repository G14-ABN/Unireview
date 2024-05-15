export {Lezioni}
import { Professors } from "./professori"  
import { Corsi } from "./corsi"
import { Select } from "antd";
import { BaseOptionType } from "antd/es/select";


class lezione{
    professore : string
    corso : string
    constructor(professore: string, corso : string){
        this.corso = corso
        this.professore = professore
    }
}

class Lezioni{
    /*static lezioni=[new lezione('Marchese', 'Reti'),
                    new lezione('Casari', 'Reti'),
                    new lezione('Patrignani', 'Programmazione 2'),
                    new lezione('Brunetti', 'Analisi 1'),
                    new lezione('Bouquet', 'Basi di dati'),
                    new lezione('Bouquet', 'Sistemi informativi'),
                    new lezione('Patrignani', 'Programmazione avanzata'),
                    new lezione('Perotti', 'Geometria'),
                    new lezione('Ghiloni', 'Fondamenti matematici')]
    static getprofessori(corso: string = "", list : JSX.Element[] = []){
        if (corso == ""){
            list = []
            Professors.professori.forEach(element => {
                list.push(<Select.Option value = {element}>{element}</Select.Option>)
            })
        } else{
            this.lezioni.forEach(element => {
                if (element.corso ==  corso){
                    list.push(<Select.Option value = {element.professore}>{element.professore}</Select.Option>)
                }
            });
            
        }
        //this.resprofessori.concat(<Select.Option value = 'ayo'>cunt</Select.Option>)
        return list
    }
    static getcorsi(professore: string = "", list : JSX.Element[] = []){
        if (professore == ""){
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
    }*/
    static lezioni=[new lezione('Marchese', 'Reti'),
                    new lezione('Casari', 'Reti'),
                    new lezione('Patrignani', 'Programmazione 2'),
                    new lezione('Brunetti', 'Analisi 1'),
                    new lezione('Bouquet', 'Basi di dati'),
                    new lezione('Bouquet', 'Sistemi informativi'),
                    new lezione('Patrignani', 'Programmazione avanzata'),
                    new lezione('Perotti', 'Geometria'),
                    new lezione('Ghiloni', 'Fondamenti matematici')]
    static getprofessori(corso: string = "", list : {value : string}[] = []){
        if (corso == ""){
            list = []
            Professors.professori.forEach(element => {
                list.push({value :element})
            })
        } else{
            this.lezioni.forEach(element => {
                if (element.corso ==  corso){
                    list.push({value : element.professore})
                }
            });
            
        }
        //this.resprofessori.concat(<Select.Option value = 'ayo'>cunt</Select.Option>)
        return list
    }
    static getcorsi(professore: string = "", list : {value : string}[] = []){
        if (professore == ""){
            Corsi.corsi.forEach(element => {
                list.push({value : element})
            })
        } else{
            this.lezioni.forEach(element => {
                if (element.professore == professore){
                    list.push({value : element.corso})
                }
            });
        }
        return list
    }
}
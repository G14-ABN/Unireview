import { UtenteAutenticato } from "../../areaPersonale/users/utenteAutenticato"
import { Elimina } from "../../areaPersonale/review/elimina"
import { Star } from "./star"
import { Collapse, Rate, Button, Modal} from "antd"
import { useState } from "react"
import { Patch } from "../../areaPersonale/review/modifica"
export {Review}

class Review{
    autore : string
    rID : string
    professore : string
    corso : string
    data : Date | string
    valutazione_prof : Number
    valutazione_fattibile :Number
    valutazione_materiale : Number
    testo : string | undefined
    voto : Number 
    frequenza : string
    anonima : boolean
    tentativo : Number | undefined
    //elimina :JSX.Element
    
    constructor(field :{anonima: boolean
        autore: string
        data: Date | string
        esame: string
        frequenza: string
        professore: string
        tentativo: Number | undefined
        testo: string | undefined
        valutazioneFattibilita: Number
        valutazioneMateriale: Number
        valutazioneProfessore: Number
        voto: Number
        __v: Number
        _id: string}){
            this.autore= field.autore
            this.rID=field._id;
            this.professore= field.professore;
            this.corso=field.esame
            this.data = field.data
            this.testo = field.testo
            this.voto = field.voto
            this.valutazione_prof=field.valutazioneProfessore
            this.valutazione_materiale=field.valutazioneMateriale
            this.valutazione_fattibile=field.valutazioneFattibilita
            this.frequenza = field.frequenza
            this.anonima = field.anonima
            this.tentativo=field.tentativo
            //this.elimina=elimina(this.rID)
        }

    average(){
        return Number.parseFloat(((this.valutazione_fattibile.valueOf() + this.valutazione_materiale.valueOf() + 
                this.valutazione_prof.valueOf()) / 3).toPrecision(2)); 
    }

    getModal(){
        
    }

    getVoto(){
        if (this.voto.valueOf()>=18){
        return(
            <div>
            <p>{"Created in: "+ (typeof this.data == "string"? this.data : this.data.getDate())}</p>
            <p>{'Final score: '+this.voto}</p>
            <p>{"Final attempt: "+this.tentativo}</p>
            </div>
        )}
    }

    returnCollapse(){
        //const [element, setElement]=useState<JSX.Element>(<div></div>)
        var autore : String
        if (this.anonima){
            autore = "Anonimo"
        } else {
            autore= this.getName()
        }
        const del = (UtenteAutenticato.email!=undefined&&UtenteAutenticato.email==this.autore)
        if (del){
        return (
            <div>
            <Collapse 
            items={[{label: this.corso+" ("+this.professore+") "+'         ' + this.average() + '   Stars' , children: 
            <>
                <p>{autore}</p>
                <p>Easiness</p> 
                <Rate disabled defaultValue={this.valutazione_fattibile.valueOf()} />
                <p>Professor</p> 
                <Rate disabled defaultValue={this.valutazione_prof.valueOf()} />
                <p>Material</p> 
                <Rate disabled defaultValue={this.valutazione_materiale.valueOf()} />
                {this.getVoto()}
                <p>{"Attendency: "+ this.frequenza}</p>
                <p>{this.testo}</p>
                <Button onClick={()=>Elimina.handle(this.rID)}>Delete</Button>
                <Button onClick={()=>Patch.patch(this.rID, 
                    { data: this.data.toString(),
                    professore:this.professore,
                    esame: this.corso,
                    valutazioneProfessore : this.valutazione_prof.valueOf(),
                    valutazioneFattibilita: this.valutazione_fattibile.valueOf(),
                    valutazioneMateriale: this.valutazione_materiale.valueOf(),
                    testo: (this.testo==undefined? '':this.testo),
                    tentativo: (this.tentativo==undefined? 0:this.tentativo.valueOf()),
                    voto: this.voto.valueOf(),
                    frequenza: this.frequenza,
                    anonima: this.anonima }
                )}>Edit</Button>
            </>}]
            }
          />
          </div>)
        }else {
            return (
                <div>
                <Collapse 
                items={[{label: this.corso+" ("+this.professore+") "+'         ' + this.average() + '   Stars' , children: 
                <>
                    <p>{autore}</p>
                    <br/>
                    <p>Easiness</p> 
                    <Rate disabled defaultValue={this.valutazione_fattibile.valueOf()} />
                    <br/>
                    <p>Professor</p> 
                    <Rate disabled defaultValue={this.valutazione_prof.valueOf()} />
                    <br/>
                    <p>Material</p> 
                    <Rate disabled defaultValue={this.valutazione_materiale.valueOf()} />
                    <br/>
                    {this.getVoto()}
                    <p>{"Attendency: "+ this.frequenza}</p>
                    <br/>
                    <p>{this.testo}</p>
                </>}]
                }
              />
              </div>)
        }
    }
    private getName(){
        let res = ""
        for(var i =0; i<this.autore.length; i++){
            if (this.autore.charAt(i)=="."){
                res =res.concat(" ")
            } else if (this.autore.charAt(i)=="@"||this.autore.charAt(i)=="-"){
                return res;
            } else{
                res=res.concat( this.autore.charAt(i))
            }
        }
        return res;
    }
}


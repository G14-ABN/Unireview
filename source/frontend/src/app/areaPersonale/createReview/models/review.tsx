import { Star } from "./star"
import { Collapse, Rate} from "antd"
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
        }

    average(){
        return ((this.valutazione_fattibile.valueOf() + this.valutazione_materiale.valueOf() + 
                this.valutazione_prof.valueOf()) / 3).toPrecision(2); 
    }

    getVoto(){
        if (this.voto.valueOf()>=18){
        return(
            <div>
            <text>
            {"Data esame: " + (typeof this.data === "string" 
                ? new Date(this.data).toLocaleDateString('it-IT', { year: 'numeric', month: '2-digit', day: '2-digit' })
                : this.data.toLocaleDateString('it-IT', { year: 'numeric', month: '2-digit', day: '2-digit' }))
            }
            </text>
            <br/>
            <text>{'Voto finale: '+this.voto}</text>
            <br/>
            <text>{"Tentativo all'accettazione: "+this.tentativo}</text>
            </div>
        )}
    }

    returnCollapse(){
        var autore : String
        if (this.anonima){
            autore = "Anonimo"
        } else {
            autore= this.autore
        }
        return (
            <Collapse 
            items={[{label: autore.toString()+'         ' + this.average() + '   Stelle' , children: 
            <div>
                <text>Fattibilità</text> 
                <Rate disabled defaultValue={this.valutazione_fattibile.valueOf()} />
                <br/>
                <text>Professore</text> 
                <Rate disabled defaultValue={this.valutazione_prof.valueOf()} />
                <br/>
                <text>Materiale</text> 
                <Rate disabled defaultValue={this.valutazione_materiale.valueOf()} />
                <br/>
                {this.getVoto()}
                <text>{"Frequenza: "+ this.frequenza}</text>
                <br/>
                <text>{this.testo}</text>
            </div>}]
            }
          />)
    }
    
}


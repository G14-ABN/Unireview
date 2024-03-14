import { Star } from "./star"
import { Collapse, Rate, Divider } from "antd"
export {Review}

const frequenza : string[] = [
    "Non frequentante",
    "Rara",
    "Occasionale",
    "Frequente"
]

class Review{
    autore : String
    rID : number
    professore : String
    corso : String
    data_esame : Date
    data = new Date()
    valutazione_prof = new Star()
    valutazione_fattibile = new Star()
    valutazione_materiale = new Star()
    testo : String | undefined
    voto : number |undefined
    frequenza : number
    anonima : boolean
    tentativo : number | undefined

    constructor(autore : String,
        rID : number,
        professore : String,
        corso : String,
        data : Date,
        valutazione_prof : number,
        valutazione_fattibile: number,
        valutazione_materiale : number,
        frequenza : number,
        anonima : boolean);

    constructor(autore : String,
        rID : number,
        professore : String,
        corso : String,
        data : Date,
        valutazione_prof : number,
        valutazione_fattibile: number,
        valutazione_materiale : number,
        frequenza : number,
        anonima : boolean,
        voto? : number,
        tentativo?: number,
        testo?  : String);
    
    constructor(autore : String,
        rID : number,
        professore : String,
        corso : String,
        data : Date,
        valutazione_prof : number,
        valutazione_fattibile: number,
        valutazione_materiale : number,
        frequenza : number,
        anonima : boolean,
        voto? : number,
        tentativo?: number,
        testo?  : String){
            this.autore= autore
            this.rID=rID;
            this.professore= professore;
            this.corso=corso
            this.data_esame = data
            this.testo = testo
            this.voto = voto
            this.valutazione_prof.setValue(valutazione_prof)
            this.valutazione_materiale.setValue(valutazione_materiale)
            this.valutazione_fattibile.setValue(valutazione_fattibile)
            this.frequenza = frequenza
            this.anonima = anonima
            this.tentativo=tentativo
        }
    getFrequenza(){
        return frequenza.at(this.frequenza)
    }

    average(){
        return ((this.valutazione_fattibile.getValue() + this.valutazione_materiale.getValue() + 
                this.valutazione_prof.getValue()) / 3).toPrecision(2); 
    }

    getVoto(){
        if (this.voto != undefined){
        return(
            <div>
            <text>{"Data esame: "+ this.data_esame.toDateString()}</text>
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
                <Rate disabled defaultValue={this.valutazione_fattibile.getValue()} />
                <br/>
                <text>Professore</text> 
                <Rate disabled defaultValue={this.valutazione_prof.getValue()} />
                <br/>
                <text>Materiale</text> 
                <Rate disabled defaultValue={this.valutazione_materiale.getValue()} />
                <br/>
                {this.getVoto()}
                <text>{"Frequenza: "+ this.getFrequenza()}</text>
                <br/>
                <text>{this.testo}</text>
            </div>}]
            }
          />)
    }
    
}


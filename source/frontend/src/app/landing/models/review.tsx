import { UtenteAutenticato } from "../../areaPersonale/users/utenteAutenticato"
import { Elimina } from "../../areaPersonale/review/elimina"
import { Collapse, Rate, Button, Modal} from "antd"
import { Modifica } from "../../areaPersonale/review/modifica"
export {Review, returnCollapse}

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

    getName(){
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

    getVoto(){
        if (this.voto.valueOf()>=18){
        return(
            <div>
            <p>{"Data esame: " + (typeof this.data === "string" 
                ? new Date(this.data).toLocaleDateString('it-IT', { year: 'numeric', month: '2-digit', day: '2-digit' })
                : this.data.toLocaleDateString('it-IT', { year: 'numeric', month: '2-digit', day: '2-digit' }))}
            </p>
            <p>{'Voto finale: '+this.voto}</p>
            <p>{"Tentativo all'accettazione: "+this.tentativo}</p>
            </div>
        )}
    }
}
function returnCollapse(review: Review, setReview :React.Dispatch<React.SetStateAction<{
    data: string;
    professore: string;
    esame: string;
    valutazioneProfessore: number;
    valutazioneFattibilita: number;
    valutazioneMateriale: number;
    testo: string;
    tentativo: number;
    voto: number;
    frequenza: string;
    anonima: boolean;
  }>>, setOpen :React.Dispatch<React.SetStateAction<boolean>>,
  setVoto :React.Dispatch<React.SetStateAction<boolean>>){
    //const [element, setElement]=useState<JSX.Element>(<div></div>)
    var autore : String
    if (review.anonima){
        autore = "Anonimo"
    } else {
        autore= review.getName()
    }
    const del = (UtenteAutenticato.email!=undefined&&UtenteAutenticato.email==review.autore)
    if (del){
    return (
        <div key = {review.rID}>
        <Collapse 
        items={[{label: review.corso+" ("+review.professore+") "+'         ' + review.average() + '   Stelle' , children: 
        <>
            <p>{autore}</p>
            <p>Fattibilità</p> 
            <Rate disabled defaultValue={review.valutazione_fattibile.valueOf()} />
            <p>Professore</p> 
            <Rate disabled defaultValue={review.valutazione_prof.valueOf()} />
            <p>Materiale</p> 
            <Rate disabled defaultValue={review.valutazione_materiale.valueOf()} />
            {review.getVoto()}
            <p>{"Frequenza: " + (review.frequenza === "0%" ? "Nessuna" : review.frequenza)}</p>
            <p>{review.testo}</p>
            <Button onClick={()=>Elimina.handle(review.rID)}>Elimina</Button>
            <Button onClick={()=>{
                Modifica(review.rID, {data: review.data.toString(),
                    professore: review.professore,
                    esame: review.corso,
                    valutazioneProfessore: review.valutazione_prof.valueOf(),
                    valutazioneFattibilita: review.valutazione_fattibile.valueOf(),
                    valutazioneMateriale: review.valutazione_materiale.valueOf(),
                    testo: review.testo==undefined?"":review.testo,
                    tentativo: review.tentativo==undefined?0:review.tentativo.valueOf(),
                    voto: review.voto==undefined?17:review.voto.valueOf(),
                    frequenza: review.frequenza,
                    anonima: review.anonima}, setReview, setOpen, setVoto)
            }}>Modifica</Button>
        </>}]
        }
      />
      </div>)
    }else {
        return (
            <div key = {review.rID}>
            <Collapse 
            items={[{label: review.corso+" ("+review.professore+") "+'         ' + review.average() + '   Stelle' , children: 
            <>
                <p>{autore}</p>
                <br/>
                <p>Fattibilità</p> 
                <Rate disabled defaultValue={review.valutazione_fattibile.valueOf()} />
                <br/>
                <p>Professore</p> 
                <Rate disabled defaultValue={review.valutazione_prof.valueOf()} />
                <br/>
                <p>Materiale</p> 
                <Rate disabled defaultValue={review.valutazione_materiale.valueOf()} />
                <br/>
                {review.getVoto()}
                <p>{"Frequenza: " + (review.frequenza === "0%" ? "Nessuna" : review.frequenza)}</p>
                <br/>
                <p>{review.testo}</p>
            </>}]
            }
          />
          </div>)
    }
}


import { Review } from "../areaPersonale/createReview/models/review"
export {getReviews}

function noDup(from : {_id:string,
    autore: string,
    professore: string,
    esame: string,
    data: Date,
    valutazioneProfessore: Number,
    valutazioneFattibilita: Number,
    valutazioneMateriale: Number,
    testo: string|undefined,
    tentativo: Number|undefined,
    voto: Number|undefined,
    frequenza: string,
    anonima: boolean}[]){
    const dest : { _id:string,
        autore: string,
        professore: string,
        esame: string,
        data: Date,
        valutazioneProfessore: Number,
        valutazioneFattibilita: Number,
        valutazioneMateriale: Number,
        testo: string|undefined,
        tentativo: Number|undefined,
        voto: Number|undefined,
        frequenza: string,
        anonima: boolean}[] = []
    from.forEach(l=>{
        var found = false
        dest.forEach(p=>{
            if (l._id==p._id){
                found=true
                return
            }
        })
        if (!found){
            dest.push(l)
        }
    })
    const revs : React.JSX.Element [] = []
    dest.forEach(e=>{
        revs.push(new Review(e).returnCollapse())
    })
    return revs
}


async function getReviews(professore : string, corso : string, _id :string = ""){
    async function fetch() : Promise <{ _id:string,
        autore: string,
        professore: string,
        esame: string,
        data: Date,
        valutazioneProfessore: Number,
        valutazioneFattibilita: Number,
        valutazioneMateriale: Number,
        testo: string|undefined,
        tentativo: Number|undefined,
        voto: Number|undefined,
        frequenza: string,
        anonima: boolean}[]>{        
        return new Promise((resolve, rejects)=>{
                const XMLHttpRequest = require('xhr2');
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:8080/api/reviews', true);
                xhr.onreadystatechange = ()=>{  
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {        
                            const reviews : { 
                                _id:string,
                                autore: string,
                                professore: string,
                                esame: string,
                                data: Date,
                                valutazioneProfessore: Number,
                                valutazioneFattibilita: Number,
                                valutazioneMateriale: Number,
                                testo: string|undefined,
                                tentativo: Number|undefined,
                                voto: Number|undefined,
                                frequenza: string,
                                anonima: boolean}[] = JSON.parse(xhr.responseText);
                        if (reviews != undefined){
                            resolve(reviews)
                        } else {
                            rejects('Error fetching exams:'+ xhr.status + xhr.statusText);
                        }
                        }
                    };
                }
                xhr.send()
            })
            
        }
        const temp = await fetch()
        console.log(temp)
        //console.log(1)
        //console.log(lezioni)
        return noDup(temp)
    }
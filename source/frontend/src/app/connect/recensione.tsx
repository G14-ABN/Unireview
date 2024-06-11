import { Review } from "../areaPersonale/createReview/models/review"
export {getReviews}

function noDup(from : {anonima: boolean
    autore: string
    data: string
    esame: string
    frequenza: string
    professore: string
    tentativo: Number
    testo: string
    valutazioneFattibilita: Number
    valutazioneMateriale: Number
    valutazioneProfessore: Number
    voto: Number
    __v: Number
    _id: string}[]){
    const dest : { anonima: boolean
        autore: string
        data:  string
        esame: string
        frequenza: string
        professore: string
        tentativo: Number
        testo: string
        valutazioneFattibilita: Number
        valutazioneMateriale: Number
        valutazioneProfessore: Number
        voto: Number
        __v: Number
        _id: string}[] = []
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
    const revs : JSX.Element [] = []
    dest.forEach(e=>{
        try{
        const r = new Review(e)
        revs.push(r.returnCollapse())
    }catch(error){
        //console.log(e)
        //console.log(error)
    }
    })
    //console.log(revs)
    return revs
}


async function getReviews(professore : string, corso : string, _id :string = ""){
    async function fetch() : Promise <{ anonima: boolean
        autore: string
        data: string
        esame: string
        frequenza: string
        professore: string
        tentativo: Number
        testo: string
        valutazioneFattibilita: Number
        valutazioneMateriale: Number
        valutazioneProfessore: Number
        voto: Number
        __v: Number
        _id: string}[]>{        
        return new Promise((resolve, rejects)=>{
                const XMLHttpRequest = require('xhr2');
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:8080/api/review', true);
                xhr.onreadystatechange = ()=>{  
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {        
                            const reviews : { 
                                anonima: boolean
                                autore: string
                                data: string
                                esame: string
                                frequenza: string
                                professore: string
                                tentativo: Number
                                testo: string
                                valutazioneFattibilita: Number
                                valutazioneMateriale: Number
                                valutazioneProfessore: Number
                                voto: Number
                                __v: Number
                                _id: string}[] = JSON.parse(xhr.responseText);
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
        //console.log(temp)
        //console.log(1)
        //console.log(lezioni)
        return noDup(temp)
    }
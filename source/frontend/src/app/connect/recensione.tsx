import { Review } from "../landing/models/review"
import { Order } from "../landing/search/ordina"
export {getReviews}

const BACKEND_URI = process.env.BACKEND_URI;

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
    console.log(dest)
    const revs : Review [] = []
    dest.forEach(e=>{
        try{
        revs.push(new Review(e))
    }catch(error){
        //console.log(e)
        //console.log(error)
    }
    })
    //console.log(revs)
    revs.sort(Order.sort)
    return revs
}

function noCourses(from : {anonima: boolean
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
    _id: string}[], course :string){
        const res : {anonima: boolean
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
            _id: string}[] = []
        from.forEach((e)=>{
            if (e.esame==course){
                res.push(e)
            }
        })
        return res
    }


async function getReviews(professore : string, corso : string, autore=""){
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
        if (autore!=""){
            return new Promise((resolve, rejects)=>{
                const XMLHttpRequest = require('xhr2');
                const xhr = new XMLHttpRequest();
                xhr.open('GET', `${BACKEND_URI}/api/review/`+autore, true);
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
                    }if (xhr.status === 404){
                        resolve([])
                    };
                }
                xhr.send()
            })
        }else if (professore==""&&corso==""){
        return new Promise((resolve, rejects)=>{
                const XMLHttpRequest = require('xhr2');
                const xhr = new XMLHttpRequest();
                xhr.open('GET', `${BACKEND_URI}/api/review`, true);
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
                    }if (xhr.status === 404){
                        resolve([])
                    };
                }
                xhr.send()
            })}
            else if (corso==""){
                return new Promise((resolve, rejects)=>{
                    const XMLHttpRequest = require('xhr2');
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', `${BACKEND_URI}/api/review/professore/`+professore, true);
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
                        }if (xhr.status === 404){
                            resolve([])
                        };
                    }
                    xhr.send()
                })
            } else if (professore==""){
                return new Promise((resolve, rejects)=>{
                    const XMLHttpRequest = require('xhr2');
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', `${BACKEND_URI}/api/review/esame/`+corso, true);
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
                        }else if (xhr.status === 404){
                            resolve([])
                        };
                    }
                    xhr.send()
                })
            }else {
                return new Promise((resolve, rejects)=>{
                    const XMLHttpRequest = require('xhr2');
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', `${BACKEND_URI}/api/review/professore?professore=`+professore, true);
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
                        }if (xhr.status === 404){
                            resolve([])
                        };
                    }
                    xhr.send()
                })
            }
            
        }
        let temp = await fetch()
        if (professore!=""&&corso!=""){
            temp = noCourses(temp, corso)
        }
        //console.log(temp)
        //console.log(1)
        //console.log(lezioni)
        return noDup(temp)
    }
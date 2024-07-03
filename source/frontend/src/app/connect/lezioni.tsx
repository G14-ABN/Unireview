export {init, getcorsi, getprofessori, isExam, isProfessor}

const BASE_URI = process.env.BASE_URI;

class lezione{
    esame: string
    professore: string
    constructor(professore: string, corso: string){
        this.esame = corso
        this.professore = professore
    }
}

class Lezioni{
    static lezioni : lezione[]=[]
    static professori : string[] = []
    static corsi : string[] = []
}
function noDup(){
    const dest : lezione[] = []
    Lezioni.lezioni.forEach(l=>{
        var found = false
        dest.forEach(p=>{
            if (l.professore==p.professore && l.esame==p.esame){
                found=true
                return
            }
        })
        if (!found){
            dest.push(l)
        }
    })
    Lezioni.lezioni=dest
}

function isProfessor(s:string){
    let res = false
    Lezioni.professori.forEach((e)=>{
        if (e.toLowerCase()==s.toLowerCase()){
            res= true
        }
    })
    return res
}

function isExam(s:string){
    let res = false
    Lezioni.corsi.forEach((e)=>{
        if (e.toLowerCase()==s.toLowerCase()){
            res= true
        }
    })
    console.log(res)
    return res
}

function initField(){
    Lezioni.lezioni.forEach(l=>{
        var found = false
        Lezioni.professori.forEach(p=>{
            if (p==l.professore){
                found=true
                return
            }
        })
        if (!found){
            Lezioni.professori.push(l.professore)
        }
    })
    //console.log(professori)
    Lezioni.lezioni.forEach(l=>{
        var found = false
        Lezioni.corsi.forEach(p=>{
            if (p==l.esame){
                found=true
                return
            }
        })
        if (!found){
            Lezioni.corsi.push(l.esame)
        }
    })
}

    async function init(){
        async function fetch() : Promise<{_id : string, professore: string, esame : string}[]>{
            
            return new Promise((resolve, rejects)=>{
                const XMLHttpRequest = require('xhr2');
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'BASE_URI/api/exam', true);
                xhr.onreadystatechange = ()=>{  
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {        
                            const exams : {_id : string,
                                           professore : string,
                                           esame : string
                        }[] = JSON.parse(xhr.responseText);
                        if (exams != undefined){
                            resolve(exams)
                        } else {
                            console.log(xhr.status+xhr.statusText)
                            rejects('Error fetching exams:'+ xhr.status + xhr.statusText);
                        }
                        }
                    };
                }
                xhr.send()
            })
            
        }
        //console.log(1)
        //console.log(lezioni)
        let tmp = await fetch()
        tmp.forEach((element: { _id: string; professore: string; esame: string }) => {
            Lezioni.lezioni.push(element)
        });
        initField()
        noDup()
        return {professori : getprofessori(), corsi : getcorsi()}
    }
    function getprofessori(corso: string = "", list : {value : string}[] = []){
        if (corso == ""){
            Lezioni.professori.forEach(element => {
                list.push({value :element})
            })
        } else{
            Lezioni.lezioni.forEach(element => {
                if (element.esame ==  corso){
                    console.log("professore selezionalto")
                    console.log(element.professore) 
                    list.push({value : element.professore})
                }
            });
            
        }
        return list
    }
    function getcorsi(professore: String = "", list : {value : string}[] = []){
        if (professore == ""){
            Lezioni.corsi.forEach(element => {
                list.push({value : element})
            })
        } else{
            Lezioni.lezioni.forEach(element => {
                if (element.professore == professore){
                    console.log("corsi")
                    list.push({value : element.esame})
                }
            });
        }
        return list
    }

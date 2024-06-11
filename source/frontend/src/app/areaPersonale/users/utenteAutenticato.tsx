import { UtenteAnonimo } from "./utenteAnonimo"
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
async function init(token:string, dec : {email:string, nomeUtente:string}){
    async function fetch() : Promise<{
        email: string,
        type: string
        moderatore: boolean
        nomeUtente: string
        bannedUntil: string
        linguaUI: boolean
        temaUI: boolean
        }>{
        
        return new Promise((resolve, rejects)=>{
            const XMLHttpRequest = require('xhr2');
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:8080/api/user?email='+dec.email, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.onreadystatechange = ()=>{  
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {        
                        const user : {email: string,
                            type: string
                            moderatore: boolean
                            nomeUtente: string
                            bannedUntil: string
                            linguaUI: boolean
                            temaUI: boolean
                    } = JSON.parse(xhr.responseText);
                    console.log(user)
                    if (user != undefined){
                        resolve(user)
                    } else {
                        console.log(xhr.status+xhr.statusText)
                        rejects('Error fetching user:'+ xhr.status + xhr.statusText);
                    }
                    }
                };
            }
            xhr.send()
        })
        
    }
    return fetch()
}
class UtenteAutenticato extends UtenteAnonimo{
    static token: string
    static email : string
    static moderatore: boolean
    static nomeUtente: string
    static bannedUntil: Date
    static linguaUI: boolean
    static temaUI: boolean
    constructor(){
        super()
        const dec : {email:string, nomeUtente : string} = jwtDecode(UtenteAutenticato.token)
        console.log(dec)
        useEffect(() => {
            (async () => {
              try {
                const res =await init(UtenteAutenticato.token, dec)
                UtenteAutenticato.email=res.email
                UtenteAutenticato.moderatore=res.moderatore
                UtenteAutenticato.nomeUtente=res.nomeUtente
                UtenteAutenticato.bannedUntil=new Date(res.bannedUntil)
                console.log(UtenteAutenticato.bannedUntil)
                UtenteAutenticato.linguaUI=res.linguaUI
                UtenteAutenticato.temaUI=res.temaUI
                console.log(res)
              } catch (err) {
                console.log('Error occured when fetching');
              }
            })();
          }, []);
    }
}
export {UtenteAutenticato}
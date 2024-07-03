export {Start}
import { UtenteAnonimo } from "./utenteAnonimo"
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;

function Start(){
    const dec : {email:string, nomeUtente : string}|null = UtenteAutenticato.token?jwtDecode(UtenteAutenticato.token):null
        UtenteAutenticato.email=dec?dec.email:""
    useEffect(() => {
        (async () => {
          try {
            console.log("fetch")
            const res =await UtenteAutenticato.init(UtenteAutenticato.token, dec)
            console.log(res)
            if(res){
            UtenteAutenticato.email=res.email
            UtenteAutenticato.moderatore=res.moderatore
            UtenteAutenticato.nomeUtente=res.nomeUtente
            UtenteAutenticato.bannedUntil=new Date(res.bannedUntil)
            console.log(UtenteAutenticato.bannedUntil)
            UtenteAutenticato.linguaUI=res.linguaUI
            UtenteAutenticato.temaUI=res.temaUI}
            console.log(res)
          } catch (err) {
            console.log('Error occured when fetching');
          }
        })();
      }, []);
}
class UtenteAutenticato extends UtenteAnonimo{
    static token: string|null
    static email : string
    static moderatore: boolean
    static nomeUtente: string
    static bannedUntil: Date
    static linguaUI: boolean
    static temaUI=false
    static changeTema(){
        this.temaUI=!this.temaUI
        if(UtenteAutenticato.token){
            const XMLHttpRequest = require('xhr2');
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", `${BACKEND_URI}/api/user/theme`, true);
            xhr.setRequestHeader('Authorization', UtenteAutenticato.token);
            xhr.setRequestHeader("Content-Type", 'application/json')
            xhr.send(JSON.stringify({temaUi:this.temaUI}))
        }
    }
    static async init(token:string|null, dec : {email:string, nomeUtente:string}|null){
        if(!token){
            return null
        }
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
                xhr.open('GET', `${BACKEND_URI}/api/user/`+(dec?dec.email:""), true);
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
    
}
export {UtenteAutenticato}
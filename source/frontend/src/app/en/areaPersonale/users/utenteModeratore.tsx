import { UtenteAutenticato } from "./utenteAutenticato";

const BASE_URI = process.env.BASE_URI;

class UtenteModeratore{
    static promote(email:string){
    const XMLHttpRequest = require('xhr2');
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", `${BASE_URI}/api/user/promote-moderator/`+email, true);
    xhr.setRequestHeader('Authorization', UtenteAutenticato.token);
    xhr.setRequestHeader("Content-Type", 'application/json')
    xhr.send()
    }

}
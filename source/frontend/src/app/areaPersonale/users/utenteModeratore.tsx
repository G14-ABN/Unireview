import { UtenteAutenticato } from "./utenteAutenticato";

class UtenteModeratore{
    static promote(email:string){
    const XMLHttpRequest = require('xhr2');
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", "http://localhost:8080/api/user/promote-moderator/"+email, true);
    xhr.setRequestHeader('Authorization', UtenteAutenticato.token);
    xhr.setRequestHeader("Content-Type", 'application/json')
    xhr.send()
    }

}
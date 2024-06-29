import React ,{ useState } from "react";
export {Tema}

class Tema{
    tema : boolean
    temaChange : React.Dispatch<React.SetStateAction<boolean>>
    constructor(){
        const [tema, temaChange] = useState(true);
        this.tema = tema 
        this.temaChange = temaChange
    }
    change (){
        //this.tema = !this.tema;
        this.temaChange(!this.tema)
    }
    getTema(){
        return this.tema;
    }
}
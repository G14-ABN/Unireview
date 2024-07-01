import React ,{ useState } from "react";
export {Tema}

function Tema(){
        const [tema, temaChange] = useState(true);
        //this.tema = !this.tema;
    temaChange(tema)
}
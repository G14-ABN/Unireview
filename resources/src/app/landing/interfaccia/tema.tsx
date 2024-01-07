export {Tema}

class Tema{
    static tema = true;
    static change (){
        Tema.tema = !Tema.tema;
        //location.reload();
    }
    static getTema(){
        return this.tema;
    }
}
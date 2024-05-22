export {Lingua}

class Lingua{
    static lingua = true;
    static change (){
        Lingua.lingua = !Lingua.lingua;
        //location.reload();
    }
    static getTema(){
        return this.lingua;
    }
}
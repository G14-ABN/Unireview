export {Star}

class Star{
    private value : number
    constructor(){
        this.value=0;
    }
    getValue() {
        return this.value;
    }
    setValue(value:number){
        if (value<0){
            this.value=0;
        } else if (value>5){
            this.value=5;
        } else {
            this.value= Math.floor(value);
        }
    }
}
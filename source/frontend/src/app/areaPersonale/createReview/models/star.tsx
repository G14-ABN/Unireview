export {Star}

class Star{
    private value : Number
    constructor(){
        this.value=0;
    }
    getValue() {
        return this.value;
    }
    setValue(value:Number){
        if (value.valueOf()<0){
            this.value=0;
        } else if (value.valueOf()>5){
            this.value=5;
        } else {
            this.value= Math.floor(value.valueOf());
        }
    }
}
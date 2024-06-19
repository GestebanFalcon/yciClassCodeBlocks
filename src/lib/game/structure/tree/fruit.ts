export default class Fruit{

    private type: string;
    private nutrition?: number;

    constructor({type}: {type: string}){
        
        this.type = type;
        
        if (this.type === "Acorn"){
            return;
        }

        this.nutrition = 20;
        
    }

    public isEdible(): boolean{
        if (this.nutrition){
            return true
        }
        return false;
    }
    public getNutrition(){
        return this.nutrition;
    }

}
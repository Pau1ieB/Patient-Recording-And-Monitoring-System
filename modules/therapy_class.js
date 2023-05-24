import {BaseClass} from "./base_class.js";

export default class TherapyClass extends BaseClass{
    constructor(name,layouts,therapy){
        super(name,layouts);
        this.therapy=therapy;
    }
    
    ResetTherapy(){
        this.therapy.name="";
        this.therapy.data=[];
    }
    
    SetTherapyName(name){this.therapy.name=name;}
 
    SetTherapyData(data){this.therapy.data=data;}
}
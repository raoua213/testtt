import { Activite } from './activite';
import { Eleve } from "./eleve";

export class Evaluation {
    idEvaluation!:number;
    note:number;
    remarque:String;
    fk_evaluation!: Eleve;
    fk_evaluation2!:Activite;
    
    constructor(){
        
        this.note=0;
        this.remarque="";
    }

}

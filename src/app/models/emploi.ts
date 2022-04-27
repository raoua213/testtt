import { Activite } from './activite';
import { Employe } from './employe';
export class Emploi {
    idEmploi!:number;
    salle:String;
    date_emp!:Date;
    fk_emploi2!:Employe;
    fk_emploi!:Activite;
    constructor(){
        
        this.salle="";
    }
}

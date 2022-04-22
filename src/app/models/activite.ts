import { Emploi } from "./emploi";

export class Activite {
idActivite: number;
nom_activite:String;
type:String;
date_act!:Date
horaire_act:String;
fk_emploi!:Emploi;


constructor(){
    this.idActivite=0;
    this.nom_activite="";
    this.type="";
 
    this.horaire_act="";

}

}

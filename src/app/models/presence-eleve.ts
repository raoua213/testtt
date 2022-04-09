import { Eleve } from 'src/app/models/eleve';
export class PresenceEleve {
idPE:number;
datePE!:Date
etat:boolean;
presence!:Eleve
constructor(){
    this.idPE=0;
    this.etat=true;
    //this.date = new Date();
}

}

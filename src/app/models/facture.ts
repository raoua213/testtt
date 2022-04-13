import { Eleve } from 'src/app/models/eleve';
export class Facture {
    idFacture: number;
    from_date!:Date;
    to_date!:Date;
    montent:number;
    etat:boolean;
    factures!:Eleve

    constructor(){
        this.idFacture=0;
        this.montent=0;
        this.etat=true;
    }

}

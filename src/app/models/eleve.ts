import { Facture } from './facture';
import { Classee } from './classee';
import { Album } from './album';


export class Eleve {
    idEleve:number
    nom : String;
    prenom: String;
    date!:Date
    genre:String;
    taille:String;
    poid:number;
    vaccination :String;
    maladie:String;
    medicament:String;
    photos:String;
    nom_parent:String;
    tel_parent:String;
    email_parent:String;
    adresse:String;
    eleves:Classee;
    img!:any;
    factures!:Facture[]
    galleries!:Album[];
    constructor(){
        this.idEleve=0;
        this.nom="";
        this.prenom="";
      
        this.genre="";
        this.taille="";
        this.poid=0;
        this.vaccination="";
        this.maladie="";
        this.medicament="";
        this.photos="";
        this.nom_parent="";
        this.tel_parent="";
        this.email_parent="";
    this.adresse="";
    this.eleves=new Classee();
    }

}

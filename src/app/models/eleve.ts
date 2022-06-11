import { Facture } from './facture';
import { Classee } from './classee';
import { Album } from './album';


export class Eleve {
    idEleve!:number
    nom!: String;
    prenom!: String;
    date_nais!:Date
    genre!:String;
    taille!:String;
    poid!:number;
    vaccination!:String;
    maladies!:String;
    medicament!:String;
    photos!:String;
    nom_parent!:String;
    tel_parent!:String;
    email_parent!:String;
    adresse!:String;
    eleves!:Classee;
    img!:any;
    factures!:Facture[]
    galleries!:Album[];
    

}

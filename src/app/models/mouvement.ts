import { Article } from './article';
export class Mouvement {
    idMouvement!:number;
    mouvement!:String;
    quantite!:number;
    dateCon!:string;
    fk_Art!:Article;
    prixTotale!:number;
}

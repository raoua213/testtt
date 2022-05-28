import { Commande } from './commande';
import { Mouvement } from './mouvement';
export class Article {
    idArticle!:number;
    labelle!:String;
    prix!:number;
    categorie!:String;
    quantite!:number;
    inventoryStatus?:string;
    fk_Art!:Mouvement;
    fk_Article!:Commande;
    
}

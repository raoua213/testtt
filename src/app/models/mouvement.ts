import { Article } from './article';
export class Mouvement {
    idMouvement!:number;
    quantite_consome!:number;
    quantite_reste!:number;
    dateCon!:number;
    fk_Art!:Article;
}

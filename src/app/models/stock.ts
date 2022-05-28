export class Stock {
    idStock:number;
    quantite:number;
    date_fin_stock!:Date;
    date_commande!:Date;

    constructor(){
        this.idStock=0;
        this.quantite=0;
    }
}

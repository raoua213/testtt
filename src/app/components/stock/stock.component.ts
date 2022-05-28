import { CommandeService } from './../../service/commande.service';
import { ArticleService } from './../../service/article.service';
import { Commande } from './../../models/commande';
import { Article } from './../../models/article';
import { Mouvement } from './../../models/mouvement';
import { Stock } from './../../models/stock';
import { StockService } from './../../service/stock.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class StockComponent implements OnInit {
  listArticle :Article[] = [] ;
  article = new Article;
  Mouvement= new Mouvement;
  commande = new Commande;
  selectedArticle: Article[]= [];
  listeCA: Article[]=[];
  displayBasic= false;
  
  constructor(private stockService:StockService,private commandeservice : CommandeService, private articleService: ArticleService,private confirmationService: ConfirmationService, private messageService: MessageService) { }
  
  ngOnInit(): void {
    this.getArticle();

  this.status(this.article);
  }
 
  save(){}
 

  public status(article:  Article){
    if( this.article.quantite<10){
this.article.inventoryStatus=="LOWSTOCK"
    }
    else if (this.article.quantite<10)
{
  this.article.inventoryStatus=="INSTOCK"
}
else {
  this.article.inventoryStatus=="OUTOFSTOCK"
}
  }

  showBasicDialog() {
    this.displayBasic = true;
  }
  showBasicModal2(article:Article) {
    this.displayBasic = true;
    this.article=article;
  }

  public getArticle(): void{
    this.articleService.getAllArticle().subscribe(
      (response: Article[])=>{
        this.listArticle = response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    );
  }

  public onAddArticle(addForm: NgForm): void {
    console.log(addForm.value)
    if(addForm.value.idArticle!=null){
      this.articleService.updateArticle(addForm.value).subscribe( 
        (response: Article) => {
        console.log(response);
        this.getArticle();
        this.article=new Article();
        addForm.reset();

      }
    );
  }else{
    this.articleService.AddArticle(addForm.value).subscribe( 
      (response: Article) => {
      console.log(response);
      this.getArticle();
      this.article=new Article();
      addForm.reset();
    }
  );
    
  }
    
  }

  public deleteArticle(id :any): void{
    this.articleService.DeleteArticle(id).subscribe(
      (response: Article) => {
        console.log(response);
        this.getArticle();
       
      }
    )
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.listArticle = this.listArticle.filter(val => !this.selectedArticle.includes(val));
            this.selectedArticle = [];
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
}



}


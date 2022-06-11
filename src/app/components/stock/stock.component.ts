import { MouvementService } from './../../service/mouvement.service';
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
import { NgIf, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { createOfflineCompileUrlResolver } from '@angular/compiler';


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
  selectedArticle2= new Article;
  listeCA: Article[]=[];
  displayBasic= false;
  displayBasic3= false;
  constructor(private stockService:StockService,private commandeservice : CommandeService,private mouvementService : MouvementService, private router:Router, private articleService: ArticleService,private confirmationService: ConfirmationService, private messageService: MessageService) { }
  
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

  showBasicModal3(article:Article) {
    this.displayBasic3 = true;
    this.selectedArticle2=article;
   
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
      addMouvement(Forms: NgForm){
        Forms.value.dateCon=formatDate(new Date(Forms.value.dateCon),"yyyy-MM-dd","en");
      if (Forms.value.mouvement=='Sortie'){
        //Forms.value.prixTotale=this.selectedArticle2.prix*Forms.value.quantite*(-1);
        Forms.value.prixTotale=0;
        this.selectedArticle2.quantite=this.selectedArticle2.quantite-Forms.value.quantite;
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        });
      }
      else {
        Forms.value.prixTotale=this.selectedArticle2.prix*Forms.value.quantite;
        this.selectedArticle2.quantite=this.selectedArticle2.quantite + Forms.value.quantite;
      }
      Forms.value.fk_Art=this.selectedArticle2;
      console.log(Forms.value)
      this.mouvementService.AddMouvement(Forms.value).subscribe(data=>{
        console.log(data)
        this.articleService.updateArticle(this.selectedArticle2).subscribe();
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        });
      })
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      });
      
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
        
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        });
      }
    );
  }else{
    this.articleService.AddArticle(addForm.value).subscribe( 
      (response: Article) => {
      console.log(response);
      let mov= new Mouvement();
        mov.quantite=this.article.quantite;
        mov.fk_Art=response;
        mov.mouvement="Entrée";
        mov.prixTotale=response.prix*response.quantite
        mov.dateCon=formatDate(new Date,"yyyy-MM-dd","en");
        this.mouvementService.AddMouvement(mov).subscribe();
      this.getArticle();
      this.article=new Article();
      addForm.reset();
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      });
      
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


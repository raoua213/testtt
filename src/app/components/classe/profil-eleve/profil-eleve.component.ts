import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Eleve } from 'src/app/models/eleve';
import { EleveService } from 'src/app/service/eleve.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profil-eleve',
  templateUrl: './profil-eleve.component.html',
  styleUrls: ['./profil-eleve.component.scss']
})
export class ProfilEleveComponent implements OnInit {
  eleve=new Eleve() ;
  id:any;
  
  constructor(private eleveService: EleveService  ,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getElevebyid(this.id)
  }

 /* eleve=[
    {nom:'Telli',prenom:'Syrine', date_nais:'14/06/2015',age:'7ans' ,taille:'1m',poid:'20kg',medicament:'aucun',maladie:'aucune',nom_parent:'lilia',tel_parent:'55883423',
    email_parent:'leila@gmail.com',image:'assets/enf.jpg' },
  
  ]*/
 


  public getElevebyid(id:any): void{
    this.eleveService.FindEleveById(id).subscribe(
      (response: Eleve)=>{
        this.eleve = response;
        console.log(response)
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    );
  }
  public updateEleve(addForms:NgForm){
    this.eleveService.updateEleve(this.eleve).subscribe(data=>{
      console.log(addForms)
      console.log(data)
      this.eleve=data;
    })
  }

}

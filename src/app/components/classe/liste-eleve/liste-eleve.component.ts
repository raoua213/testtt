import { PresenceEleveService } from './../../../service/presence-eleve.service';
import { PresenceEleve } from './../../../models/presence-eleve';
import { Eleve } from './../../../models/eleve';
import { Component, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
//import * as EventEmitter from 'events';
import { EleveService } from 'src/app/service/eleve.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ClasseService } from 'src/app/service/classe.service';

@Component({
  selector: 'app-liste-eleve',
  templateUrl: './liste-eleve.component.html',
  styleUrls: ['./liste-eleve.component.scss']
})
export class ListeEleveComponent implements OnInit {
  eleves:any=[];
  idClasse:any;
  classes:any=[]
  presences:any[]=[]
  //@Input() classeInput:any;
  classeInput:any={};
  constructor(private eleveService: EleveService,  private classeService:ClasseService, private presenceService:PresenceEleveService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idClasse = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.idClasse);
    this.geteleveByClasse(this.idClasse);
    this.getAllClasses();
    
  }

 getAllClasses(){
   this.classeService.GetAllClasses().subscribe(data=>{
    this.classes=data;
   })
 }
  geteleveByClasse(id:number){
    this.eleveService.Findbyclasse(id).subscribe(
      (data) => {

        console.log('here fined student', data);
        this.classeInput.eleves= data;

      }
    );
  }

  public onAddeleve(addForms: NgForm): void {
    // document.getElementById('add-employee-form').click();
    let serializedForm = JSON.stringify(addForms.value);
    console.log(serializedForm);

    this.eleveService.AddEleve(addForms.value).subscribe(
       (response:Eleve) => {
         console.log(response);
         this.geteleveByClasse(this.idClasse);
         addForms.reset();
       },
       (error: HttpErrorResponse) => {
      console.log(error);
         addForms.reset();
       }
     );
   

  }
  getPresences(p:any){
    this.presences=p.presences
  }

 public presenceClick(elem:Eleve,value:any){
  let presence:any={}
  presence.datePE=new Date();
  presence.etat=value.target.value;
  presence.presence=elem;
  console.log(presence)
  this.presenceService.AddPeleve(presence).subscribe(data=>{
    console.log(data)
    this.geteleveByClasse(this.idClasse);
  })
 }



  public onDeleteEleve(id: number): void {
    this.eleveService.DeleteEleve(id).subscribe(
      (response) => {
        
        this.geteleveByClasse(this.idClasse);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

}

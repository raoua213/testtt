import { Classee } from './../../../models/classee';
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
import { formatDate } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/angular';


@Component({
  selector: 'app-liste-eleve',
  templateUrl: './liste-eleve.component.html',
  styleUrls: ['./liste-eleve.component.scss']
})
export class ListeEleveComponent implements OnInit {
  eleves:any=[];
  idClasse:any;
  classe=new Classee;
  presences:any[]=[]
  curr = new Date();
  week : string[]=[];
  //@Input() classeInput:any;
  classeInput:any={};
 
  constructor(private eleveService: EleveService,  private classeService:ClasseService, private presenceService:PresenceEleveService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idClasse = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.idClasse);
    this.geteleveByClasse(this.idClasse);
    this.getClassesById(this.idClasse);
  
    this.getWeek();
  }
  getWeek(){
    for (let i = 1; i <= 5; i++) {
      let first = this.curr.getDate() - this.curr.getDay() + i 
      let day = new Date(this.curr.setDate(first)).toISOString().slice(0, 10)
      this.week.push(day)
    }
  }
 getClassesById(id:number){
   this.classeService.FindClasseById(id).subscribe(data=>{
    console.log(data)
    this.classe=data;
    
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
    addForms.value.eleves=this.classe;
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

 public presenceClick(elem:any,value:any,day:string){
 /* let presence:any={}
  presence.datePE=new Date();
  presence.etat=value.target.value;
  presence.presence=elem;
  console.log(presence)
  this.presenceService.AddPeleve(presence).subscribe(data=>{
    console.log(data)
    this.geteleveByClasse(this.idClasse);
  })*/

  //let d=formatDate(new Date(),'yyyy-MM-dd', 'en-US');
  console.log(day);
  
  let index = elem.presences.findIndex((x: { datePE: any; }) => x.datePE==day);
  console.log(elem.presences)
  console.log(index)
  if(index!=-1){
    let presence=elem.presences[index]
    presence.etat=value.target.value;
   
    presence.presence={idEleve:elem.idEleve}
    console.log(presence)
    this.presenceService.updatePeleve(presence).subscribe(data=>{
      console.log(data)
      this.geteleveByClasse(this.idClasse);
    })
  }
  else{
    let presence:any={}
    presence.datePE=day;
    presence.etat=value.target.value;
   
    presence.presence={idEleve:elem.idEleve}
    this.presenceService.AddPeleve(presence).subscribe(data=>{
      console.log(data)
      this.geteleveByClasse(this.idClasse);
    })
  }
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

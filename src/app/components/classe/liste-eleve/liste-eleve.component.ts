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
  listPresences:any[]=[]
  eleve=new Eleve
  selectedFile!: File;
  curr = new Date();
  week : string[]=[];
  //@Input() classeInput:any;
  classeInput:any={};
  listOfWeeks:string[][]=[];
  constructor(private eleveService: EleveService,  private classeService:ClasseService, private presenceService:PresenceEleveService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idClasse = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.idClasse);
    
    this.getClassesById(this.idClasse);
    this.geteleveByClasse(this.idClasse);
    this.week=this.getWeek(this.curr);
    
    
    
    console.log(this.classeInput)
    this.listOfWeeks=this.getListOfWeeks()
  }

  


  getWeekPresence(){
    let elem:any
    
    let p=this.classeInput.eleves
    for(let j=0;j<p.length;j++){
      
      let tab=[]
      for(let i=0;i<this.week.length;i++){
        let index = p[j].presences.findIndex((x: { datePE: any; }) => x.datePE==this.week[i]);
        
        if(index!=-1){
          tab.push({etat:p[j].presences[index].etat,datePE:this.week[i],idEleve:p[j].idEleve})
        }else{
         tab.push({etat:false,datePE:this.week[i],idEleve:p[j].idEleve})
        }
      }
      p[j].weekPresence=tab
      tab=[]
    }
  }
  getListOfWeeks(){
    //matrice of weeks
    let listWeeks:string[][]=[]
    //min date
    let startDate=new Date("2022-03-26");
    
    console.log(startDate);
    //max date
    let today=new Date()
    while(startDate.getTime()<today.getTime()){
      let week=this.getWeek(startDate)
      listWeeks.push(week)
      console.log('list of weeks'+week +'\n')
      startDate.setDate(startDate.getDate()+7)
    }
    let week=this.getWeek(new Date)
    listWeeks.push(week)
    return listWeeks

  }
  getWeek(curr:any){
    let week:string[]=[]
    for (let i = 1; i <= 5; i++) {
      let first = curr.getDate() - curr.getDay() + i 
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
       week.push(day)
    }
    return week
  }
 getClassesById(id:number){
   this.classeService.FindClasseById(id).subscribe(data=>{
    console.log(data)
    this.classe=data;
    
    
   })
 }
 public addEleve(addForms:NgForm){
  addForms.value.eleves=this.classe;
  addForms.value.eleves.eleves=[]
  const uploadImageData = new FormData();
  uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  let x = JSON.stringify(addForms.value);
  uploadImageData.append('eleve', x)
  this.eleveService.AddEleve(uploadImageData).subscribe(data=>{
    console.log(addForms)
    console.log(data)
    this.eleve=data;
    console.log(this.eleve)
    this.geteleveByClasse(this.idClasse)
  })
}

 saveAllPresences(){
  for(let j=0;j<this.classeInput.eleves.length;j++){
    let list=this.classeInput.eleves[j].presences;
  
    for(let i=0;i<list.length;i++){
      list[i].presence={idEleve:this.classeInput.eleves[j].idEleve}
      if(list[i].idPE==0){
        this.presenceService.AddPeleve(list[i]).subscribe()
        
    }
      else{
        this.presenceService.updatePeleve(list[i]).subscribe()
        
      }
    }
  }
  this.geteleveByClasse(this.idClasse);
 }
 changeEtatPresence(elem:any,e:any){
   console.log(elem)
  let index = this.classeInput.eleves.findIndex((x: { idEleve: any; }) => x.idEleve==elem.idEleve); 
  let index2 = this.classeInput.eleves[index].presences.findIndex((x: { datePE: any; }) =>
   x.datePE==elem.datePE); 
  if(index2==-1){
    let p=new PresenceEleve()
    p.datePE=elem.datePE;
    p.etat=true;
    this.classeInput.eleves[index].presences.push({idPE:0,datePE:elem.datePE,etat:true})
  }else{
   this.classeInput.eleves[index].presences[index2].etat= e.target.checked
 }
  console.log(this.classeInput.eleves[index])
  
}
  geteleveByClasse(id:number){
    this.eleveService.Findbyclasse(id).subscribe(
      (data) => {

        console.log('here fined student', data);
        this.classeInput.eleves= data;
        this.getWeekPresence();
      
      }
    );
  }
  public onFileChanged(event: any) {

    //Select File
    this.selectedFile = event.target.files[0];
    let x = JSON.stringify(this.selectedFile);
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
  onChangeSelect(e:any){
    console.log(e.target.value)
    let date=new Date(e.target.value)
    this.week=this.getWeek(date)
    this.getWeekPresence()
  }

}

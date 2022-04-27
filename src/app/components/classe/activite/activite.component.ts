import { EmploiService } from './../../../service/emploi.service';
import { Employe } from './../../../models/employe';
import { EmployeService } from './../../../service/employe.service';
import { Emploi } from './../../../models/emploi';
import { ActiviteService } from './../../../service/activite.service';
import { NgForm } from '@angular/forms';
import { Activite } from './../../../models/activite';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.scss']
})
export class ActiviteComponent implements OnInit {
  showModal=false;
  selectedDate:any;
  employees:Employe[]=[];
  events:Activite[]=[];
  events2:any[]=[];
  emplois:Emploi[]=[];
  emploi= new Emploi
  event:Activite=new Activite();
  calendarOptions: CalendarOptions ={};
  constructor(private service:ActiviteService, private ps:EmployeService, private es:EmploiService) { }

   ngOnInit() {
    this.getAll();  
    this.getAllEmployee(); 
  }
getAllEmployee(){
  this.ps.GetAllEmp().subscribe(data=>{
    this.employees=data;
  })
}
getAll(){
  this.service.GetAllActivities().subscribe( data=>{
  this.events2=[]
  this.events=data
  
  console.log(this.events)
   this.events.forEach(x=>this.events2.push({'title':x.nom_activite,'date':x.date_act,'id':x.idActivite}))
    console.log(this.events2);
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
      events: [...this.events2],
      eventClick: this.getById.bind(this)
    };
    
  })
}
 
  getById(info:any){
    this.showModal=true;
    this.service.FindActiviteById(info.event.id).subscribe(data=>{
      this.event=data;
      this.selectedDate=this.event.date_act;
      console.log(data)
      //this.emploi=data.fk_emploi[0]
      this.event.fk_emploi=data.fk_emploi
      if(data.fk_emploi[0]){
      this.emploi=data.fk_emploi[0];
      }
    })
  }
  handleDateClick(arg: any) {
    console.log(arg)
    this.selectedDate= arg.dateStr;
    this.showModal=true;
    
  }
 
  saveEvent(form:NgForm){
    form.value.date_act=this.selectedDate
    
    this.emploi.date_emp=this.selectedDate;

    this.emplois.push(this.emploi)
    
        form.value.fk_emploi=[...this.emplois];
    console.log(form.value)
    if(form.value.idActivite!=null){
    
      this.service.updateActivite(form.value).subscribe(data=>{
        console.log(data)
        this.emploi.fk_emploi=data;
        this.es.updateEmploi(this.emploi).subscribe();
        this.getAll();
        this.closeModal();
        this.event=new Activite();
        this.emplois=[]
        this.emploi=new Emploi
      })
    }
    else{
      this.service.AddActivite(form.value).subscribe(data=>{
        this.emploi.fk_emploi=data;
        this.es.AddEmploi(this.emploi).subscribe();
        this.getAll();
        this.closeModal();
        this.event=new Activite();
        this.emplois=[]
        this.emploi=new Emploi
      });
    }
    
  }
  closeModal(){
    this.showModal=false;
  }
}


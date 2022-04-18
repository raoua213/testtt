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
  events:Activite[]=[];
  events2:any[]=[];
  event:Activite=new Activite();
  calendarOptions: CalendarOptions ={};
  constructor(private service:ActiviteService) { }

   ngOnInit() {
    this.getAll();   
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
    })
  }
  handleDateClick(arg: any) {
    this.selectedDate= arg.dateStr;
    this.showModal=true;
  }
 
  saveEvent(form:NgForm){
    form.value.date_act=this.selectedDate
    console.log(form.value)
    if(form.value.idActivite!=null){
      this.service.updateActivite(form.value).subscribe(data=>{
        this.getAll();
        this.closeModal();
        this.event=new Activite();
      })
    }
    else{
      this.service.AddActivite(form.value).subscribe(data=>{
        this.getAll();
        this.closeModal();
        this.event=new Activite();
      });
    }
    
  }
  closeModal(){
    this.showModal=false;
  }
}


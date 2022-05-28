import { ClasseService } from 'src/app/service/classe.service';
import { EmploiService } from './../../../service/emploi.service';
import { Employe } from './../../../models/employe';
import { EmployeService } from './../../../service/employe.service';
import { Emploi } from './../../../models/emploi';
import { ActiviteService } from './../../../service/activite.service';
import { NgForm } from '@angular/forms';
import { Activite } from './../../../models/activite';
import { Classee } from './../../../models/classee';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { CongesService } from 'src/app/service/conges.service';
import { PrimeNGConfig } from 'primeng/api';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.scss'],
  providers: [MessageService]
})
export class ActiviteComponent implements OnInit {
  showModal=false;
  selectedClass=new Classee();
  idClasse:number=0;
  listClasse:Classee[]=[];
  selectedDate:any;
  employees:Employe[]=[];
  events:Activite[]=[];
  events2:any[]=[];
  emplois:Emploi[]=[];
  
  selectedValue="";
  emploi= new Emploi();
  event:Activite=new Activite();
  displayBasic= false;
  displayBasic2= false;
  calendarOptions: CalendarOptions ={};

  constructor(private service:ActiviteService, private router: Router, private primengConfig: PrimeNGConfig, private ps:EmployeService, private es:EmploiService, private serviceConges:CongesService,private classeService:ClasseService,private messageService: MessageService) { }

  showBasicDialog() {

      this.displayBasic = true;
  }
   ngOnInit() {
    this.primengConfig.ripple = true;
      
    this.getAllEmployee(); 
    this.getAllClasses()
  }
getAllEmployee(){
  this.ps.GetAllEmp().subscribe(data=>{
    this.employees=data;
  })
}
getAllClasses(){
  this.classeService.GetAllClasses().subscribe(data=>{
    console.log(data)
    this.listClasse=data
    this.selectedClass=data[0];
    this.getAll(data[0]);
  })
}
getAll(classe:Classee){
  this.selectedClass=classe;
  this.idClasse=classe.idClasse;
  this.service.FindActiviteByIdClasse(this.idClasse).subscribe( data=>{
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
showBasicDialog2(){
  this.displayBasic2=true;
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
      console.log(this.emploi);
      }
    })
  }
  handleDateClick(arg: any) {
    console.log(arg)
    this.selectedDate= arg.dateStr;
    this.showModal=true;
    
  }
  checkConges():boolean{
    let b=false;
    console.log(this.emploi.fk_emploi2)
    this.serviceConges.findCongesByIdPersonnel(this.emploi.fk_emploi2.idPersonnel).subscribe(data=>{
      console.log(data)
      let index=data.findIndex((x: { dateC: any; }) => x.dateC==this.selectedDate);
      if(index != -1){
        console.log("conges")
        //alert('Employé en congé')
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Employé en congé'});
        
      }
    })
    this.service.FindActiviteByIdPersonnel(this.emploi.fk_emploi2.idPersonnel).subscribe(data=>{
      console.log(data);
      let index=data.findIndex((x: { date_act: any; }) => x.date_act==this.selectedDate);
      if(index != -1){
        console.log("activité")
        //alert('Employé a une activité')
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Employé a une activité'});
        //this.canSubmit=false
        b= true;
      }else{
        b= false;
        //this.canSubmit=true
      }
    })
    return b;
  }
 
 
  saveEvent(form:NgForm){
    
    console.log(this.emploi);
    this.emploi.fk_emploi2=form.value.fk_emploi2;
    
    form.value.date_act=this.selectedDate
    
    this.emploi.date_emp=this.selectedDate;

    this.emplois.push(this.emploi)
    form.value.fk_emploi=[];
        form.value.fk_emploi.push(this.emploi);
        form.value.fk_activites=new Classee();
        form.value.fk_activites=this.selectedClass;
        
    console.log(form.value)
    if(form.value.idActivite!=null){
      
        this.service.updateActivite(form.value).subscribe(data=>{
          console.log(data)
          this.emploi.fk_emploi=data;
          
          this.es.updateEmploi(this.emploi).subscribe(data=>console.log(data));
          this.getAll(this.selectedClass);
          this.closeModal();
          this.event=new Activite();
          this.emplois=[]
          this.emploi=new Emploi
          form.reset();
        })
      
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        });
    }
    else{
      
      let b= this.checkConges();
      if(b==false){
      console.log(this.idClasse)
      console.log("kk2332")
      this.service.AddActivite(form.value).subscribe(data=>{
        this.emploi.fk_emploi=data;
        this.es.AddEmploi(this.emploi).subscribe();
        this.getAll(this.selectedClass);
        this.closeModal();
        this.event=new Activite();
        this.emplois=[]
        this.emploi=new Emploi
        form.reset();
        this.closeModal();
      });
    }
    }
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate([currentUrl]);
    });
  }
  closeModal(){
    this.showModal=false;
  }
}


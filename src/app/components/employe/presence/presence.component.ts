import { PresenceEmp } from './../../../models/presence-emp';
import { Employe } from 'src/app/models/employe';
import { EmployeService } from './../../../service/employe.service';
import { PresenceEmployeService } from './../../../service/presence-employe.service';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss']
})
export class PresenceComponent implements OnInit {
employees:any[]=[]
presences:any[]=[]

curr = new Date();
  week : string[]=[];
  listOfWeeks:string[][]=[];
  constructor(private presenceService:PresenceEmployeService, private empService:EmployeService, private router: Router) { }

  ngOnInit(): void {
    this.getAllEmp();
    this.week =this.getWeek(this.curr);
    this.listOfWeeks=this.getListOfWeeks();

  }
  saveAllPresences(){
    for(let j=0;j<this.employees.length;j++){
      let list=this.employees[j].presences;
    
      for(let i=0;i<list.length;i++){
        list[i].presence={idPersonnel:this.employees[j].idPersonnel}
        if(list[i].idPP==0){
          this.presenceService.AddPemploye(list[i]).subscribe()
      }
        else{
          this.presenceService.updatePemploye(list[i]).subscribe()
          
        }
      }
    }
    //this.getAllEmp();
    //reload pag
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate([currentUrl]);
    });
    //

  }
  onChangeSelect(e:any){
    console.log(e.target.value)
    let date=new Date(e.target.value)
    this.week=this.getWeek(date)
    this.getWeekPresence()
  }
  getAllEmp(){
    this.empService.GetAllEmp().subscribe(data=>{
      this.employees=data
      this.getWeekPresence();
      console.log(data)
    })
  }

  getWeekPresence(){
    let elem:any
    
    let p=this.employees
    for(let j=0;j<p.length;j++){
      
      let tab=[]
      for(let i=0;i<this.week.length;i++){
        let index = p[j].presences.findIndex((x: { date: any; }) => x.date==this.week[i]);
        
        if(index!=-1){
          tab.push({etat:p[j].presences[index].etat,date:this.week[i],idPersonnel:p[j].idPersonnel})
        }else{
         tab.push({etat:false,date:this.week[i],idPersonnel:p[j].idPersonnel})
        }
      }
      
      p[j].weekPresence=tab
      tab=[]
      
    }
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



  getPresences(p:any){
    
    this.presences=p.presences
    /*this.eleveService.FindEleveById(id).subscribe(data=>{
      console.log(data)
    })*/
  }

  changeEtatPresence(elem:any,e:any){
    console.log(elem)
    let index = this.employees.findIndex((x: { idPersonnel: any; }) => x.idPersonnel==elem.idPersonnel); 
    let index2 = this.employees[index].presences.findIndex((x: { date: any; }) =>
    x.date==elem.date); 
    if(index2==-1){
      
      this.employees[index].presences.push({idPP:0,date:elem.date,etat:true})
    }else{
    this.employees[index].presences[index2].etat= e.target.checked
  }
    console.log(this.employees[index])
  }

  public presenceClick(elem:any,value:any){
    /*let presence:any={}
    presence.date=new Date();
    presence.etat=value.target.value;
    presence.presence=elem;
    console.log(presence)
    this.presenceService.AddPemploye(presence).subscribe(data=>{
      console.log(data);
      this.getAllEmp();
    })*/
    let d=formatDate(new Date(),'yyyy-MM-dd', 'en-US');
    let index = elem.presences.findIndex((x: { date: any; }) => x.date==d);
    if(index!=-1){
      let presence=elem.presences[index]
      presence.etat=value.target.value;
     
      presence.presence={idPersonnel:elem.idPersonnel}
      console.log(presence)
      this.presenceService.updatePemploye(presence).subscribe(data=>{
        console.log(data)
        this.getAllEmp();
      })
    }else{
      let presence:any={}
      presence.date=new Date();
      presence.etat=value.target.value;
     
      presence.presence={idPersonnel:elem.idPersonnel}
      this.presenceService.AddPemploye(presence).subscribe(data=>{
        console.log(data)
        this.getAllEmp();
      })
    }
   }




  
}

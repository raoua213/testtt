import { EmployeService } from './../../../service/employe.service';
import { PresenceEmployeService } from './../../../service/presence-employe.service';
import { Employe } from './../../../models/employe';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss']
})
export class PresenceComponent implements OnInit {
employees:any[]=[]
presences:any[]=[]
  constructor(private presenceService:PresenceEmployeService, private empService:EmployeService) { }

  ngOnInit(): void {
    this.getAllEmp();
  }
  getAllEmp(){
    this.empService.GetAllEmp().subscribe(data=>{
      this.employees=data
      console.log(data)
    })
  }
  getPresences(p:any){
    
    this.presences=p.presences
    /*this.eleveService.FindEleveById(id).subscribe(data=>{
      console.log(data)
    })*/
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
      this.presenceService.updateEleve(presence).subscribe(data=>{
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


 /* liste=[
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'},
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'},  
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'},
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'},
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'},
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'},
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'},
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'}]*/

  presence=[
    {id:1 , select:false , name: 'sofia'},
    {id:1 , select:false , name: 'sofia'},
    {id:1 , select:false , name: 'sofia'},
    {id:1 , select:false , name: 'sofia'},
    {id:1 , select:false , name: 'sofia'},
    {id:1 , select:false , name: 'sofia'},
    {id:1 , select:false , name: 'sofia'},
    {id:1 , select:false , name: 'sofia'},
    
  ]
}

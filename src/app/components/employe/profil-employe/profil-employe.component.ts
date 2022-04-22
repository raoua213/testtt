import { ActiviteService } from './../../../service/activite.service';
import { EmployeService } from './../../../service/employe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employe } from 'src/app/models/employe';
import { NgForm } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profil-employe',
  templateUrl: './profil-employe.component.html',
  styleUrls: ['./profil-employe.component.scss']
})
export class ProfilEmployeComponent implements OnInit {
  id:any;
  emp=new Employe()
  retrievedImage:any;
  selectedFile!: File;
  calendarOptions: CalendarOptions ={};
  constructor(private activatedRoute: ActivatedRoute, private serviceEmployee:EmployeService, private serviceActivite:ActiviteService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getEmployeeById(this.id);
    this.getActiviteByIdPersonnel(this.id);
  }
  public  getEmployeeById(id:any){
    this.serviceEmployee.FindEmpById(id).subscribe(
      (response:Employe)=>{
        this.emp=response;
        this.retrievedImage='data:image/jpg;base64,'+this.emp.img;
        
        console.log(response)
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    );
  }
  public onFileChanged(event: any) {

    //Select File
    this.selectedFile = event.target.files[0];
    let x = JSON.stringify(this.selectedFile);
  }


  getActiviteByIdPersonnel(id:number){
    this.serviceActivite.FindActiviteByIdPersonnel(id).subscribe(data=>{
      console.log(data);
      let events2: { title: any; date: any; id: any; }[]=[]
      data.forEach((x: { nom_activite: any; date_act: any; idActivite: any; })=>events2.push({'title':x.nom_activite,'date':x.date_act,'id':x.idActivite}))
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        
        events: [...events2],
        
      };
    })
  }
  public onUpdateEmloyee(addForm :NgForm){
    this.serviceEmployee.updateEmploye(this.emp).subscribe(data=>{
      console.log(data)
    })
  }

  public updateEmploye(addForms:NgForm){
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    let x = JSON.stringify(addForms.value);
    uploadImageData.append('eleve', x)
    this.serviceEmployee.updateEmploye(uploadImageData).subscribe(data=>{
      console.log(addForms)
      console.log(data)
      this.emp=data;
      console.log(this.emp)
    })
  }






  addConget(addForm:NgForm){
    let d1=new Date(addForm.value.fdate)
    let d2=new Date(addForm.value.todate)
    let diff=d2.getTime()-d1.getTime();
    let differenceInDays=Math.floor(diff / (1000 * 3600 * 24))
    console.log(differenceInDays+"jours")
  }

}

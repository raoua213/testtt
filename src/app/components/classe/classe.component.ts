import { Eleve } from './../../models/eleve';
import { EleveService } from './../../service/eleve.service';


import { Classee } from '../../models/classee';
import { Component, OnInit } from '@angular/core';
import { ClasseService } from 'src/app/service/classe.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {
 /* classe=[
    {id:1, name:"jasmin",nombre:23},
    {id:1, name:"jasmin",nombre:23},
    {id:1, name:"jasmin",nombre:23},
    {id:1, name:"jasmin",nombre:23},
    {id:1, name:"jasmin",nombre:23},
    {id:1, name:"jasmin",nombre:23},
    {id:1, name:"jasmin",nombre:23},
  
  
  ]*/
  classee :Classee[] = [] ;
id:any;
eleve:any={};
  constructor(private classeService :ClasseService,private eleveService :EleveService) { }

  ngOnInit(): void {
    this.getClasses();
  }

  public getClasses(): void{
    this.classeService.GetAllClasses().subscribe(
      (response: Classee[])=>{
        this.classee = response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    );
  }


  public onAddCLasse(addForms: NgForm): void {
    // document.getElementById('add-employee-form').click();
    this.classeService.AddClasse(addForms.value).subscribe(
       (response: Classee[]) => {
         console.log(response);
         this.getClasses();
         addForms.reset();
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
         addForms.reset();
       }
     );
     console.log(addForms.value);
     


  }


 public ongetEleveByClasse(id:any): void{
    this.eleveService.Findbyclasse(id).subscribe(
      (response: Eleve[])=>{
        this.eleve= response;
        console.log(response);
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    );
  }


}

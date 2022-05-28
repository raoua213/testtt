import { Router } from '@angular/router';
import { Eleve } from './../../models/eleve';
import { EleveService } from './../../service/eleve.service';


import { Classee } from '../../models/classee';
import { Component, OnInit } from '@angular/core';
import { ClasseService } from 'src/app/service/classe.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {
  displayBasic= false;
  classee :Classee[] = [] ;
  id:any;

  eleve:any={};

  constructor(private classeService :ClasseService,private router:Router,private primengConfig: PrimeNGConfig,private eleveService :EleveService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getClasses();
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  closeBasicDialog() {
    this.displayBasic = false;
  }
  public getClasses(): void{
    this.classeService.GetAllClasses().subscribe(
      (response: Classee[])=>{
        this.classee = response;
        console.log(this.classee)
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
     this.closeBasicDialog()
     


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



  public onDeleteClasse(id: number): void {
    this.classeService.DeleteClasse(id).subscribe(
      (response) => {
        
        this.getClasses();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate([currentUrl]);
    });
  }
}

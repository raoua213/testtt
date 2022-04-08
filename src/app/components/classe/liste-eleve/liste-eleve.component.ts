import { Eleve } from './../../../models/eleve';
import { Component, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
//import * as EventEmitter from 'events';
import { EleveService } from 'src/app/service/eleve.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-liste-eleve',
  templateUrl: './liste-eleve.component.html',
  styleUrls: ['./liste-eleve.component.scss']
})
export class ListeEleveComponent implements OnInit {
  eleves:any=[];
  idClasse:any;
  //@Input() classeInput:any;
  classeInput:any={};
  constructor(private eleveService: EleveService,  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idClasse = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.idClasse);
    this.geteleveByClasse(this.idClasse);
    
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
    let serializedForm = JSON.stringify(addForms.value);
    console.log(serializedForm);

    this.eleveService.AddEleve(addForms.value).subscribe(
       (response) => {
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



 /* public onDeleteEleve(id: number): void {
    this.eleveService.DeleteEleve(id).subscribe(
      (response: void) => {
        console.log(response);
        this.geteleveByClasse(id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }*/

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Eleve } from 'src/app/models/eleve';
import { EleveService } from 'src/app/service/eleve.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  eleve=new Eleve() ;
  id:any;
  constructor(private eleveService: EleveService  ,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getElevebyid(this.id)
  }


  public getElevebyid(id:any): void{
    this.eleveService.FindEleveById(id).subscribe(
      (response: Eleve)=>{
        this.eleve = response;
        console.log(response)
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    );
  }
  public updateEleve(addForms:NgForm){
    this.eleveService.updateEleve(this.eleve).subscribe(data=>{
      console.log(addForms)
      console.log(data)
      this.eleve=data;
    })
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Eleve } from 'src/app/models/eleve';
import { EleveService } from 'src/app/service/eleve.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profil-eleve',
  templateUrl: './profil-eleve.component.html',
  styleUrls: ['./profil-eleve.component.scss']
})
export class ProfilEleveComponent implements OnInit {
  eleve=new Eleve() ;
  id:any;
  show1:boolean=false;
  show2:boolean=false;
  constructor(private eleveService: EleveService  ,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getElevebyid(this.id)
  }
collapse(){
  this.show1=!this.show1
}
 
collapse2(){
  this.show2=!this.show2
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

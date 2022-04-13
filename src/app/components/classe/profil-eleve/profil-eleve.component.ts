import { Facture } from './../../../models/facture';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Eleve } from 'src/app/models/eleve';
import { EleveService } from 'src/app/service/eleve.service';
import { NgForm } from '@angular/forms';
import { FactureService } from 'src/app/service/facture.service';

@Component({
  selector: 'app-profil-eleve',
  templateUrl: './profil-eleve.component.html',
  styleUrls: ['./profil-eleve.component.scss']
})
export class ProfilEleveComponent implements OnInit {
  eleve=new Eleve() ;
  id:any;
  selectedFile!: File;
  show1:boolean=false;
  show2:boolean=false;
  retrievedImage:any;
  facture=new Facture;
  constructor(private eleveService: EleveService  ,private fs:FactureService, private activatedRoute: ActivatedRoute) { }

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
addMontant(){
  this.facture.factures=this.eleve;
  this.fs.AddFacture(this.facture).subscribe(data=>{
    //this.getElevebyid(this.id);
  });
}
public onFileChanged(event: any) {

  //Select File
  this.selectedFile = event.target.files[0];
  let x = JSON.stringify(this.selectedFile);
}
findDate(dateForm:NgForm){
  console.log(dateForm.value)
  this.eleve.factures=this.eleve.factures.filter(x=>x.to_date==dateForm.value.date);
}

  public getElevebyid(id:any): void{
    this.eleveService.FindEleveById(id).subscribe(
      (response: Eleve)=>{
        this.eleve = response;
        this.retrievedImage = 'data:image/jpg;base64,' + this.eleve.img;
        
        console.log(response)
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    );
  }
  public updateEleve(addForms:NgForm){
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    let x = JSON.stringify(addForms.value);
    uploadImageData.append('eleve', x)
    this.eleveService.updateEleve(uploadImageData).subscribe(data=>{
      console.log(addForms)
      console.log(data)
      this.eleve=data;
      console.log(this.eleve)
    })
  }

}

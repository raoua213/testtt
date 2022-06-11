import { ActiviteService } from './../../../service/activite.service';
import { EvaluationService } from './../../../service/evaluation.service';
import { AlbumService } from './../../../service/album.service';
import { Album } from './../../../models/album';
import { Facture } from './../../../models/facture';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Eleve } from 'src/app/models/eleve';
import { EleveService } from 'src/app/service/eleve.service';
import { NgForm } from '@angular/forms';
import { FactureService } from 'src/app/service/facture.service';
import { PrimeNGConfig } from 'primeng/api';
import { Evaluation } from 'src/app/models/evaluation';
import { Activite } from 'src/app/models/activite';


@Component({
  selector: 'app-profil-eleve',
  templateUrl: './profil-eleve.component.html',
  styleUrls: ['./profil-eleve.component.scss']
})
export class ProfilEleveComponent implements OnInit {
  eleve=new Eleve() ;
  id:any;
  selectedFile!: File;
  selectedFile2!: File;
  selectedActivity = new Activite();
  show1:boolean=false;
  show2:boolean=false;
  retrievedImage:any;
  facture=new Facture;
  galleries:Album[]=[];
  displayBasic= false;
  displayBasic4= false;
  displayBasic5= false;
  evaluer=false;
  paiementdialog=false;
  listActivite:Activite[]=[]
  responsiveOptions;
  constructor(private eleveService: EleveService,private evaluationservice :EvaluationService,private albumService:AlbumService ,private primengConfig: PrimeNGConfig,private router:Router ,private fs:FactureService, private activatedRoute: ActivatedRoute, private actviteService: ActiviteService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '768px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
   }

   ngOnInit() {
    this.primengConfig.ripple = true;
     this.id =  this.activatedRoute.snapshot.paramMap.get('id');
     this.getElevebyid(this.id)
    

  }
  showBasicDialog() {
    this.displayBasic = true;
}
showBasicDialog4() {
  this.displayBasic = true;
}
showBasicDialog5() {
  this.displayBasic5 = true;
}
evaluerdialog(){
  this.evaluer=true;
}
paiemmentdialog(){
  this.paiementdialog=true;
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
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
  this.router.navigate([currentUrl]);
  });
}
public onFileChanged(event: any) {

  //Select File
  this.selectedFile = event.target.files[0];
  let x = JSON.stringify(this.selectedFile);
}

public onFileChanged2(event: any) {

  //Select File
  this.selectedFile2 = event.target.files[0];
  let x = JSON.stringify(this.selectedFile2);
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
        this.getAllActivity(id);
      });
  }
  public updateEleve(addForms:NgForm){
    const uploadImageData = new FormData();

    let imageBlob = this.dataURItoBlob(this.eleve.img);
    this.selectedFile = new File([imageBlob], "foo.png", {type:"image/png"});
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    let x = JSON.stringify(addForms.value);
    uploadImageData.append('eleve', x)
    this.eleveService.updateEleve(uploadImageData).subscribe(data=>{
      console.log(addForms)
      console.log(data)
      this.eleve=data;
      console.log(this.eleve)
    })
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate([currentUrl]);
    });
  }
  addImage(addForms:NgForm){
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile2, this.selectedFile2.name);
    let imageBlob=this.dataURItoBlob(this.eleve.img);
    let eleveFile=new File([imageBlob], "foo.png", {type:"image/png"});
    this.eleve.img = null;
    uploadImageData.append('eleveFile',eleveFile, eleveFile.name);
    console.log(this.eleve);
    let x = JSON.stringify(this.eleve);
    uploadImageData.append('eleve', x)
    this.albumService.AddAlbum(uploadImageData).subscribe(data=>{
    });
    let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      });
  }
  dataURItoBlob(dataURI:any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
    let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      });
 }

  public onaddEvaluation(addForms: NgForm) {
    let oldImg=this.eleve.img;
    this.eleve.img = this.dataURItoBlob(oldImg);
     
    // document.getElementById('add-employee-form').click();
    addForms.value.fk_evaluation=new Eleve();
    addForms.value.fk_evaluation2=new Activite();
    addForms.value.fk_evaluation.idEleve=this.eleve.idEleve;
    addForms.value.fk_evaluation2.idActivite=this.selectedActivity.idActivite;
    this.evaluationservice.addEvaluation(addForms.value).subscribe(
       (response: Evaluation) => {
         console.log(response);
         this.getElevebyid(this.id);
         addForms.reset();
       }
     );
     let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      });
    
     console.log(addForms.value);
     


  }

  getAllActivity(id:number){
    this.eleveService.FindClasseByEleveId(id).subscribe(data=>{
      
      this.actviteService.FindActiviteByIdClasse(data).subscribe(data=>{
        console.log(data)
        this.listActivite=data
      })
    })
    
  }
  addEvaluation(elem:any){
    this.evaluerdialog();
    console.log(elem);
    this.selectedActivity=elem;
  }


}

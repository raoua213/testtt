import { ActiviteService } from './../../../service/activite.service';
import { EmployeService } from './../../../service/employe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from 'src/app/models/employe';
import { NgForm } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { CongesService } from 'src/app/service/conges.service';
import { Conges } from 'src/app/models/conges';
import { DatePipe } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import {MessageService} from 'primeng/api';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-profil-employe',
  templateUrl: './profil-employe.component.html',
  styleUrls: ['./profil-employe.component.scss'],
  providers: [MessageService]
})
export class ProfilEmployeComponent implements OnInit {
  id:any;
  emp=new Employe()
  retrievedImage:any;
  listConges:any;
  oldImg:string="";
  selectedFile!: File;
  errorMessageDate:string="";
  calendarOptions: CalendarOptions ={};
  calendarOptions2: CalendarOptions ={};
  displayBasic= false;
  displayBasic2= false;
  displayBasic3= false;
  constructor(private activatedRoute: ActivatedRoute,private router: Router, private serviceEmployee:EmployeService, private serviceActivite:ActiviteService, private serviceConges:CongesService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getEmployeeById(this.id);
    this.getActiviteByIdPersonnel(this.id);
   this.getCongeByPersonnel(this.id)
  }
  closeBasicDialog2() {
    this.displayBasic2 = false;
  }
  showBasicDialog3() {
    this.displayBasic3 = true;
  }
  showBasicDialog2() {
    this.displayBasic2 = true;
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  closeBasicDialog() {
    this.displayBasic = false;
  }
  public  getEmployeeById(id:any){
    this.serviceEmployee.FindEmpById(id).subscribe(
      (response:Employe)=>{
        this.emp=response;
        this.oldImg=this.emp.img;
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
    console.log(this.selectedFile.name);
    let x = JSON.stringify(this.selectedFile);
    
    
  }


  async getActiviteByIdPersonnel(id:number){
    let events2: { title: any; date: any; id: any; }[]=[]
    await this.serviceActivite.FindActiviteByIdPersonnel(id).subscribe(data=>{
      console.log(data);
      data.forEach((x: { nom_activite: any; date_act: any; idActivite: any; })=>events2.push({'title':x.nom_activite,'date':x.date_act,'id':x.idActivite})) 
      
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        
        events: [...events2],
        
      };
    })
    /*await this.serviceConges.findCongesByIdPersonnel(id).subscribe(data=>{
      console.log(data);
      data.forEach((x: {  dateC: any; idConges: any; })=>events2.push({'title':'congés','date':x.dateC,'id':x.idConges}))
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        
        events: [...events2],
        
      };
    })*/
   
  }
  
   getCongeByPersonnel(id:number){
    let events3: { title: any; date: any; id: any; }[]=[]
     this.serviceConges.findCongesByIdPersonnel(id).subscribe(data=>{
      console.log(data);
      
      data.forEach((x: {  dateC: any; idConges: any; })=>events3.push({'title':'congés','date':x.dateC,'id':x.idConges}))
      this.listConges=events3;
      this.calendarOptions2 = {
        initialView: 'dayGridMonth',
        
        events: [...events3],
        
      };
    })
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
 }
  public updateEmploye(addForms:NgForm){
    const uploadImageData = new FormData();
    console.log(this.selectedFile)
    if(this.selectedFile!=null){
      
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }else{
      let imageBlob = this.dataURItoBlob(this.oldImg);
      this.selectedFile = new File([imageBlob], "foo.png", {type:"image/png"});
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }
    let x = JSON.stringify(addForms.value);
    uploadImageData.append('personnel', x)
    this.serviceEmployee.updateEmploye(uploadImageData).subscribe(data=>{
      console.log(addForms)
      console.log(data)
      this.emp=data;
      console.log(this.emp)
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      });
    })
   
    this.closeBasicDialog()
  }


   checkConges(cdate:Date):any{
    let b=false;
    console.log(cdate);
    let ndate= formatDate(new Date(cdate), 'yyyy-MM-dd', 'en');;
    console.log(ndate);
      this.serviceConges.findCongesByIdPersonnel(this.id).subscribe(data=>{
      console.log(data)
      let index=data.findIndex((x: { dateC: any; }) => x.dateC==ndate);
      if(index != -1){
        console.log("conges")
        this.messageService.add({severity:'error', summary: 'Error', detail: 'congé existant'});

        b=true;
      }
    })
    return b;
  }



  addConget(addForm:NgForm){
    console.log(addForm.value.fdate)
    console.log(addForm.value.todate)
    let d1=new Date(addForm.value.fdate)
    let d2=new Date(addForm.value.todate)
    if(d2<d1){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'date 2 is less then date 1'});
    }else {
    
      let ndate= formatDate(new Date(d1), 'yyyy-MM-dd', 'en');;
      console.log(ndate);
      this.serviceConges.findCongesByIdPersonnel(this.id).subscribe(data=>{
      console.log(data)
      let index=data.findIndex((x: { dateC: any; }) => x.dateC==ndate);
      if(index != -1){
        console.log("conges")
        this.messageService.add({severity:'error', summary: 'Error', detail: 'conges'});

        
      }else{
        
    let diff=d2.getTime()-d1.getTime();
    let differenceInDays=Math.floor(diff / (1000 * 3600 * 24))+1
    console.log(differenceInDays+" jours")
    this.emp.nb_jour_taken=this.emp.nb_jour_taken+differenceInDays
    this.emp.nb_jour_reste=this.emp.nb_jour_initiale-this.emp.nb_jour_taken
    const uploadImageData = new FormData();
    //this.emp.img=null;
    let imageBlob = this.dataURItoBlob(this.oldImg);
    this.selectedFile = new File([imageBlob], "foo.png", {type:"image/png"});
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    let x = JSON.stringify(this.emp);
    uploadImageData.append('personnel', x)
    this.serviceEmployee.updateEmploye(uploadImageData).subscribe(data=>{
      for(let i=0;i<differenceInDays;i++){
      let conges=new Conges()
      conges.dateC=new Date()
      
      conges.dateC.setDate(d1.getDate()+i)
      
      conges.presence=this.emp
      
      this.serviceConges.addConges(conges).subscribe();
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      });
      
    }
      
      this.getEmployeeById(this.id)})
        
      }
    })
    
    
    }
  
    this.closeBasicDialog2()
  }
  deleteConges(id:any){
    this.serviceConges.DeleteConges(id).subscribe(data=>this.getCongeByPersonnel(this.id))
  }

}

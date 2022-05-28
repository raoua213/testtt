import { EmployeService } from './../../../service/employe.service';
import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employe';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-liste-employe',
  templateUrl: './liste-employe.component.html',
  styleUrls: ['./liste-employe.component.scss']
})
export class ListeEmployeComponent implements OnInit {
  employe :Employe[] = [] ;
  selectedFile!: File;
  displayBasic= false;
  constructor(private employeService :EmployeService,private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getEmployees();
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  closeBasicDialog() {
    this.displayBasic = false;
  }
  public getEmployees(): void{
    this.employeService.GetAllEmp().subscribe(
       (response: Employe[])=>{
        
        
        this.employe = response;
      }
    );
  }

  public onAddEmloyee(addForm: NgForm): void {
    this.employeService.FindEmpByCin(addForm.value.cin).subscribe(data=>{
      if(data!=null){
        alert("cin is used")
      }else{
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
        let x = JSON.stringify(addForm.value);
        uploadImageData.append('personnel', x)
      // document.getElementById('add-employee-form').click();
        this.employeService.AddEmp(uploadImageData).subscribe(
          (response: Employe) => {
            console.log(response);
            this.getEmployees();
            addForm.reset();
            this.closeBasicDialog();
          }
        );

      }
    })
    
  }
  
  public onDeleteEmp(id: number): void {
    this.employeService.deleteEmployee(id).subscribe(
      (response) => {
        
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  public onFileChanged(event: any) {

    //Select File
    this.selectedFile = event.target.files[0];
    let x = JSON.stringify(this.selectedFile);
  }
  public onDeleteEmploye(id: number): void {
    this.employeService.deleteEmployee(id).subscribe(
      (response) => {
        
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  
}

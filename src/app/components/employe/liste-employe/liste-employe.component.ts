import { EmployeService } from './../../../service/employe.service';
import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employe';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-liste-employe',
  templateUrl: './liste-employe.component.html',
  styleUrls: ['./liste-employe.component.scss']
})
export class ListeEmployeComponent implements OnInit {
  employe :Employe[] = [] ;
  selectedFile!: File;
  constructor(private employeService :EmployeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void{
    this.employeService.GetAllEmp().subscribe(
       (response: Employe[])=>{
        
        
        this.employe = response;
      }
    );
  }

  public onAddEmloyee(addForm: NgForm): void {
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

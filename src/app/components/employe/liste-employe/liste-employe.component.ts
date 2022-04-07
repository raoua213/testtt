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
  employe :any = {} ;

  constructor(private employeService :EmployeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void{
    this.employeService.GetAllEmp().subscribe(
      (response: Employe[])=>{
        this.employe = response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    );
  }

  public onAddEmloyee(addForm: NgForm): void {
   // document.getElementById('add-employee-form').click();
    this.employeService.AddEmp(addForm.value).subscribe(
      (response: Employe) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
 

  
}

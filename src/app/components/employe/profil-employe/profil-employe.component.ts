import { EmployeService } from './../../../service/employe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employe } from 'src/app/models/employe';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profil-employe',
  templateUrl: './profil-employe.component.html',
  styleUrls: ['./profil-employe.component.scss']
})
export class ProfilEmployeComponent implements OnInit {
  id:any;
  emp=new Employe()
  constructor(private activatedRoute: ActivatedRoute, private serviceEmployee:EmployeService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getEmployeeById(this.id)
  }
  public  getEmployeeById(id:any){
    this.serviceEmployee.FindEmpById(id).subscribe(data=>{
      console.log(data)
      this.emp=data;
    })
  }

  public onUpdateEmloyee(addForm :NgForm){
    this.serviceEmployee.updateEmploye(this.emp).subscribe(data=>{
      console.log(data)
    })
  }

}

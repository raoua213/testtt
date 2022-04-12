import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name : any = "" ;
  pass : any = "";
  ad:Admin=<Admin>{}  
  constructor(private adminService : AdminService, private route: Router) { }

  ngOnInit(): void {
    this.login();
  }


  login(){
    console.log(this.name)
    this.ad.name = this.name ;
    this.ad.pass = this.pass;
    this.adminService.login(this.ad).subscribe(
      (response: Admin) => {

        localStorage.setItem("ad",JSON.stringify(response));
        {
          this.route.navigate(['acceuil']);
        }
       
      },
      (error: HttpErrorResponse)=>{
       // alert(error.message)
      }
    );

  }
}

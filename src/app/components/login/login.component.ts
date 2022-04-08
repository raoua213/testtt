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
  email : any = "" ;
  password : any = "";
  ad:Admin=<Admin>{}  
  constructor(private adminService : AdminService, private route: Router) { }

  ngOnInit(): void {
    this.login();
  }


  login(){
    console.log(this.email)
    this.ad.email = this.email ;
    this.ad.password = this.password;
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  show:boolean=true;
  constructor(private route: Router) { }

  ngOnInit(): void {
    if(window.location.href==="http://localhost:4200/login"){
      this.show=false;
    }else{
      this.show=true;
    }
  }


  
  deconnecter(){
    localStorage.removeItem('ad');
    this.route.navigate(['/login'])
  }
}

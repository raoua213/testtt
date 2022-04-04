import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {
  classe=[
    {id:1, name:"jasmin",nombre:23},
    {id:1, name:"jasmin",nombre:23},
    {id:1, name:"jasmin",nombre:23},
    {id:1, name:"jasmin",nombre:23},
    {id:1, name:"jasmin",nombre:23},
    {id:1, name:"jasmin",nombre:23},
  
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

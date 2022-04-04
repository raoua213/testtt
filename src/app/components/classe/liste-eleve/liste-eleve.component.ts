import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-eleve',
  templateUrl: './liste-eleve.component.html',
  styleUrls: ['./liste-eleve.component.scss']
})
export class ListeEleveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  presence=[
    {id:1 , select:false , name: 'sofia'},
    {id:1 , select:false , name: 'sofia'},
    {id:1 , select:false , name: 'sofia'},
    {id:1 , select:false , name: 'sofia'},
    {id:1 , select:false , name: 'sofia'},
    {id:1 , select:false , name: 'sofia'},
    {id:1 , select:false , name: 'sofia'},
    {id:1 , select:false , name: 'sofia'},
    
  ]
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss']
})
export class PresenceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }




 /* liste=[
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'},
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'},  
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'},
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'},
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'},
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'},
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'},
    {id:1,name:'sofia mihoub',image:'assets/enf.jpg'}]*/

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

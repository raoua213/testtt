import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil-eleve',
  templateUrl: './profil-eleve.component.html',
  styleUrls: ['./profil-eleve.component.scss']
})
export class ProfilEleveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  eleve=[
    {nom:'Telli',prenom:'Syrine', date_nais:'14/06/2015',age:'7ans' ,taille:'1m',poid:'20kg',medicament:'aucun',maladie:'aucune',nom_parent:'lilia',tel_parent:'55883423',
    email_parent:'leila@gmail.com',image:'assets/enf.jpg' },
  
  ]

}

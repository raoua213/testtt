import { FactureService } from './../../service/facture.service';
import { Facture } from './../../models/facture';
import { EleveService } from './../../service/eleve.service';
import { Component, OnInit } from '@angular/core';
import { Eleve } from 'src/app/models/eleve';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {
  eleves:Eleve[]=[];
  facture=new Facture;
  constructor(private es:EleveService, private fs:FactureService) { }

  ngOnInit(): void {
    this.getAllEleve();
  }
  getAllEleve(){
    this.es.GetAllEleve().subscribe(data=>{
      this.eleves=data
    })
  }
  addMontant(eleve:Eleve){
    this.facture.factures=eleve;
    this.fs.AddFacture(this.facture).subscribe(data=>{
    //this.getElevebyid(this.id);
  });
  }

}

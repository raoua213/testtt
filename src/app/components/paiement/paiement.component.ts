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
  eleve:Eleve=new Eleve();
  displayBasic=false;
  newDate:any;
  constructor(private es:EleveService, private fs:FactureService) { }

  ngOnInit(): void {
    this.getAllEleve();
  }
  getAllEleve(){
    this.es.GetAllEleve().subscribe(data=>{
      this.eleves=data
    })
  }
  showBasicDialog(){
    this.displayBasic=true
  }
  setEleve(e:any){
    this.eleve=e;
    
    this.facture.from_date=this.eleve.factures[this.eleve.factures.length-1].to_date;
    let date=new Date(this.facture.from_date);
    console.log(this.facture.from_date);
    this.facture.to_date= new Date(date.setMonth(date.getMonth()+1));
    this.newDate=this.facture.to_date.toISOString().slice(0,10);
    console.log(this.newDate);
    //this.facture.to_date= new Date(this.newDate);
   
    console.log(this.eleve)
  }
  addMontant(){
   
    this.facture.factures=this.eleve;
    console.log(this.facture)
    this.fs.AddFacture(this.facture).subscribe(data=>{
    //this.getElevebyid(this.id);
  });
  }

}

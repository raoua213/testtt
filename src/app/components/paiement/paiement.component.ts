import { Router } from '@angular/router';
import { FactureService } from './../../service/facture.service';
import { Facture } from './../../models/facture';
import { EleveService } from './../../service/eleve.service';
import { Component, OnInit } from '@angular/core';
import { Eleve } from 'src/app/models/eleve';
import { formatDate } from '@angular/common';

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
  constructor(private es:EleveService, private fs:FactureService, private router:Router, private factureService : FactureService, private eleveService:EleveService) { }

  ngOnInit(): void {
    this.getAllEleve();
this.getStatElevesP();
   

  this.multiAxisOptions = {
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          },
          tooltips: {
              mode: 'index',
              intersect: true
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                  min: 0,
                  max: 100,
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                  drawOnChartArea: false,
                  color: '#ebedef'
              },
              ticks: {
                  min: 0,
                  max: 100,
                  color: '#495057'
              }
          }
      }
  };
  
  this.multiAxisOptions = {
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        },
        tooltips: {
            mode: 'index',
            intersect: true
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
                min: 0,
                max: 100,
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                drawOnChartArea: false,
                color: '#ebedef'
            },
            ticks: {
                min: 0,
                max: 100,
                color: '#495057'
            }
        }
    }
};
  }
  getStatElevesP(){
    let listPaiement:any[]=[];
    let listNotPaymant:any[]=[];
   // let sumCommande:any=0;
    const now = new Date();
    for(let i=0;i<12;i++){
      const thisDay=formatDate(new Date(now.getFullYear(), i, 2),"yyyy-MM-dd","en");
    //const firstDay = formatDate(new Date(now.getFullYear(), i, 1),"yyyy-MM-dd","en");
    //const lastDay = formatDate(new Date(now.getFullYear(), i+1 , 0),"yyyy-MM-dd","en");
    this.eleveService.statNotPaiement(thisDay).subscribe(async data=>{
        console.log(data);
        await listNotPaymant.push(data);
    })
    this.eleveService.statPaiement(thisDay).subscribe(async data=>{
        console.log(data);
        await listPaiement.push(data);
        this.multiAxisData = {
            labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','aout','septembre','octobre','novembre','decembre'],
            datasets: [{
                label: 'Payé',
                backgroundColor: [
                    '#00800055',
                    
                ],
                yAxisID: 'y',
                //data: [65, 59, 80, 81, 56, 55, 10]
                data: listPaiement
            }, {
                label: 'Non Payé',
                backgroundColor: '#FE000055',
                yAxisID: 'y1',
                //data: [28, 48, 40, 19, 86, 27, 90]
                data: listNotPaymant
            }]
        };
    })

    }
  }
  getAllEleve(){
    this.es.GetAllEleve().subscribe(data=>{
      this.eleves=data
    })
  }
  showBasicDialog(){
    this.displayBasic=true
  }
  closeModal(){
    this.facture=new Facture;
    
  }
  setEleve(e:any){
    
    this.eleve=e;
   if(this.eleve.factures.length >0){
    this.facture.from_date=this.eleve.factures[this.eleve.factures.length-1].to_date;
   }else{
    this.facture.from_date=new Date();
   }
    /*
    if(this.facture.from_date == null || undefined){
      this.facture.from_date=new Date();
    }else{
        this.facture.from_date=this.eleve.factures[this.eleve.factures.length-1].to_date;
    }*/
    if(this.facture.to_date == null || undefined){
      this.facture.to_date=new Date();
    }
  
    
    
    let date=new Date(this.facture.from_date);
    console.log(this.facture.from_date);
    
    this.facture.to_date= new Date(date.setMonth(date.getMonth()+1));
    this.newDate=this.facture.to_date.toISOString().slice(0,10);
    console.log(this.newDate);
    //this.facture.to_date= new Date(this.newDate);
   
    console.log(this.eleve)
  }
  addMontant(){
    this.facture.from_date=formatDate(this.facture.from_date,"yyyy-MM-dd","en");
    this.facture.to_date=formatDate(this.facture.to_date,"yyyy-MM-dd","en");
    this.facture.factures=this.eleve;
    console.log(this.facture)
    this.fs.AddFacture(this.facture).subscribe(data=>{
    //this.getElevebyid(this.id);
    
    
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate([currentUrl]);
  });
  });
  }



  basicData: any;

    basicOptions: any;

    multiAxisData: any;

    chartOptions: any;

    multiAxisOptions: any;




}

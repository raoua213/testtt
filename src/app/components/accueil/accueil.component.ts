import { CommandeService } from './../../service/commande.service';
import { NgForm } from '@angular/forms';
import { FicheDPService } from './../../service/fiche-dp.service';

import { Component,OnDestroy, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';
import { formatDate } from '@angular/common';




@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  
  multiAxisData: any;

  chartOptions: any;

  multiAxisOptions: any;
   allsalaires:number[]=[];

  data: any;

  chartOptions2: any;

  constructor(private primengConfig: PrimeNGConfig, private fichedp: FicheDPService, private commandeS: CommandeService)  {}

  
   ngOnInit() {
     this.getAllsalaires();
    this.primengConfig.ripple = true;
   
  
    

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
                    max: 10000,
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
                    max: 10000,
                    color: '#495057'
                }
            }
        }
    };

    

   /* this.config = this.configService.config;
    this.updateChartOptions();
    this.subscription = this.configService.configUpdate$.subscribe(config => {
        this.config = config;
        this.updateChartOptions();
    });*/




    this.data = {
        labels: ['A','B','C'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D"
                ]
            }
        ]
    };
}



applyDarkTheme() {
   
    this.multiAxisOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
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
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    min: 0,
                    max: 10000,
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                    color: 'rgba(255,255,255,0.2)'
                },
                ticks: {
                    min: 0,
                    max: 10000,
                    color: '#ebedef'
                }
            }
        }
    };

  
}

applyLightTheme() {
    

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
                    max: 10000,
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
                    max: 10000,
                    color: '#495057'
                }
            }
        }
    };

    
}


/*updateChartOptions() {
    this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
}*/

getLightTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    }
}

getDarkTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        }
    }
}

 getAllsalaires(){
    let listSalleries:any[]=[];
   // let sumCommande:any=0;
    const now = new Date();
    for(let i=0;i<12;i++){
    const firstDay = formatDate(new Date(now.getFullYear(), i, 1),"yyyy-MM-dd","en");
    
    
    const lastDay = formatDate(new Date(now.getFullYear(), i+1 , 0),"yyyy-MM-dd","en");
   /* await this.commandeS.findAllCommande_Date(firstDay,lastDay).subscribe(data=>{
        console.log(data)
        sumCommande=sumCommande+data;
    
    
    },err=>{
        sumCommande=0;
    });*/
        



     this.fichedp.findAllSalaires_Date(firstDay,lastDay).subscribe(data=>{
        console.log(data);       
        listSalleries.push(data);
        
        this.multiAxisData = {
            labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','aout','septembre','octobre','novembre','decembre'],
            datasets: [{
                label: 'Dataset 1',
                backgroundColor: [
                    '#EC407A',
                    '#AB47BC',
                    '#42A5F5',
                    '#7E57C2',
                    '#66BB6A',
                    '#FFCA28',
                    '#26A69A',
                    '#EC407A',
                    '#AB47BC',
                    '#42A5F5',
                    '#7E57C2',
                    '#66BB6A'
                ],
                yAxisID: 'y',
                //data: [0, 0, 2000, 6000, 56, 55, 10]
                data: listSalleries
            }, {
                label: 'Dataset 2',
                backgroundColor: '#78909C',
                yAxisID: 'y1',
                data: [28, 48, 40, 19, 86, 27, 90,50,30,40,70]
            }]
        };
    },err=>{
        listSalleries.push(0);
        
    });
    //sumCommande=0
    
    }
   
    console.log(listSalleries)
    

    /*
    const firstDay = formatDate(new Date(now.getFullYear(), 4, 0),"yyyy-MM-dd","en");
    
    
    const lastDay = formatDate(new Date(now.getFullYear(), 4 + 1, 1),"yyyy-MM-dd","en");
    
    this.fichedp.findAllSalaires_Date(firstDay,lastDay).subscribe(data=>{
        console.log(data);
        
        listSalleries.push(data);
        
    },err=>{
        listSalleries.push(0);
    });
    console.log(listSalleries);
*/
}




}
 

 





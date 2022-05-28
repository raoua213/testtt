import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import {TableModule} from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { EmployeComponent } from './components/employe/employe.component';
import { ClasseComponent } from './components/classe/classe.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { StockComponent } from './components/stock/stock.component';
import { ProfilEleveComponent } from './components/classe/profil-eleve/profil-eleve.component';
import { ListeEleveComponent } from './components/classe/liste-eleve/liste-eleve.component';
import { PresenceComponent } from './components/employe/presence/presence.component';
import { ProfilEmployeComponent } from './components/employe/profil-employe/profil-employe.component';
import { LoginComponent } from './components/login/login.component';
import { ActiviteComponent } from './components/classe/activite/activite.component';
import { ListeEmployeComponent } from './components/employe/liste-employe/liste-employe.component';

//primeNg
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab

import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {MegaMenuItem} from 'primeng/api'; 
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {CarouselModule} from 'primeng/carousel';
import {ChartModule} from 'primeng/chart';

import {ToolbarModule} from 'primeng/toolbar';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';

import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



import {FileUploadModule} from 'primeng/fileupload';
//material
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ToastModule} from 'primeng/toast';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AccueilComponent,
    EmployeComponent,
    ClasseComponent,
    PaiementComponent,
    StockComponent,
    ProfilEleveComponent,
    ListeEleveComponent,
    PresenceComponent,
    ProfilEmployeComponent,
    LoginComponent,
    ActiviteComponent,
    ListeEmployeComponent,
      


  ],
  imports: [MatCardModule,
    ChartModule,
    FileUploadModule,
    ToolbarModule,
    CarouselModule,
    ToastModule,
    MatFormFieldModule,
    BrowserModule,
    TableModule,
    AppRoutingModule,
    MessagesModule,
    ConfirmDialogModule,
    FormsModule,
    CascadeSelectModule,
    ReactiveFormsModule,
    FullCalendarModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    AccordionModule,
    MenuModule,
    DialogModule,
    ButtonModule,
    TabViewModule,
    InputTextModule,
    CommonModule,
    CheckboxModule,
    CalendarModule,
  

 



    
  ],
  providers: [
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

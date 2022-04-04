import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

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
    ActiviteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

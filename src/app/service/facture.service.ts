import { Facture } from './../models/facture';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private url=environment.apiUrl;
  constructor(private httpclient: HttpClient) { }

  public GetAllFacture():Observable<Facture[]>{
    return this.httpclient.get<Facture[]>(`${this.url}/findAllFactures`);

  }
 

  public AddFacture(facture: Facture): Observable<Facture> {
    return this.httpclient.post<Facture>(`${this.url}/addFacture`, facture);
  }

  public FindFactureById(id:any):Observable<any>{
    return  this.httpclient.get<Facture>(`${this.url}/findFactureById/`,id)
  }

  public FindFactureByIdeleve(id:any):Observable<any>{
    return  this.httpclient.get<Facture>(this.url+"/findFactureByIdEleve/"+id)
  }

  public findFactureByIdEleve_Date(id:any,date:any):Observable<any>{
    return  this.httpclient.get<Facture>(this.url+"/findFactureByIdEleve_Date/"+id + date)
  }


  public FindAllPaiement_Date(DateDb:any,dateF:any):Observable<any>{
    return  this.httpclient.get<Facture>(this.url+"/AllPaiement_Date/"+DateDb+ dateF)
  }
}

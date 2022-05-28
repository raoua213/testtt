import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Commande } from '../models/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private url=environment.apiUrl;
  constructor(private httpclient: HttpClient) { }

  public GetAllCommande():Observable<Commande[]>{
    return this.httpclient.get<Commande[]>(`${this.url}/findAllCommandes`);

  }

  public AddCommande(classe:Commande):Observable<any>{
    return this.httpclient.post(this.url+"/addCommande",classe);
  }

  public updateCommande( classe:Commande): Observable<any> {
    return this.httpclient.put(this.url+"/updateCommande", classe);
  }
 
  public DeleteCommande(id:number):Observable<any>{
    return this.httpclient.delete(this.url+"/deleteCommandeById/"+id)
  }


  public FindCommandeById(id:any):Observable<any>{
    return  this.httpclient.get<Commande>(this.url+"/findCommandeById/"+id)
  }

  public findAllCommande_Date(DateDb:any,dateF:any):Observable<any>{
    return  this.httpclient.get<Commande>(this.url+"/AllCommandeDuMois/"+DateDb+"/"+dateF)
  }
}

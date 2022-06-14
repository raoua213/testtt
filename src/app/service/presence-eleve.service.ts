import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PresenceEleve } from '../models/presence-eleve';

@Injectable({
  providedIn: 'root'
})
export class PresenceEleveService {

  private url=environment.apiUrl;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','accept':'application/json'}) };  

  constructor(private httpclient: HttpClient) {

   }

   public AddPeleve(peleve:any):Observable<any>{
    return this.httpclient.post<any>(this.url+"/addPresence_eleve",peleve, this.httpOptions);
  }

  public updatePeleve( peleve:PresenceEleve): Observable<any> {
    return this.httpclient.put<any>(this.url+"/updatePresence_eleve", peleve, this.httpOptions);
  }

  public Deletepeleve(id:number):Observable<any>{
    return this.httpclient.delete(this.url+"/deletePresenceEleveByID"+id)
  }

  

}

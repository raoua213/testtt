import { Activite } from './../models/activite';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {
  private url=environment.apiUrl;

  constructor(private httpclient: HttpClient) {

   }


  public GetAllActivities():Observable<Activite[]>{
    return this.httpclient.get<Activite[]>(`${this.url}/findAllActivites`);

  }

  public AddActivite(activite:Activite):Observable<any>{
    return this.httpclient.post(this.url+"/addActivite",activite);
  }

  public updateActivite( activite:Activite): Observable<any> {
    return this.httpclient.put(this.url+"/updateActivite", activite);
  }
    public DeleteActivite(id:any):Observable<any>{
    return this.httpclient.delete(this.url+"/deleteActiviteById"+id)
  }

  public FindActiviteById(id:any):Observable<any>{
    return  this.httpclient.get<Activite>(this.url+"/findActiviteById/"+id)
  }

  public FindActiviteByIdPersonnel(id:any):Observable<any>{
    return  this.httpclient.get<Activite>(this.url+"/findActiviteByIdPersonnel/"+id)
  }

}

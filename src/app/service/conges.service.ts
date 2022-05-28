import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conges } from '../models/conges';

@Injectable({
  providedIn: 'root'
})
export class CongesService {

  private url=environment.apiUrl;

  constructor(private httpclient: HttpClient) {

   }


  public findAllConges():Observable<Conges[]>{
    return this.httpclient.get<Conges[]>(`${this.url}/findAllConges`);

  }

  public addConges(activite:Conges):Observable<any>{
    return this.httpclient.post(this.url+"/addConges",activite);
  }

  public updateClasse( classe:Conges): Observable<any> {
    return this.httpclient.put(this.url+"/updateClasse", classe);
  }
   
 
  public DeleteClasse(id:number):Observable<any>{
    return this.httpclient.delete(this.url+"/deleteCalsseByID/"+id)
  }
  public DeleteConges(id:number):Observable<any>{
    return this.httpclient.delete(this.url+"/deleteCongesById/"+id)
  }

  public findCongesById(id:any):Observable<any>{
    return  this.httpclient.get<Conges>(this.url+"/findCongesById/"+id)
  }

  public findCongesByIdPersonnel(id:any):Observable<any>{
    return  this.httpclient.get<Conges[]>(this.url+"/findCongesByIdPersonnel/"+id)
  }


  public findDispoPersonnelByConges(IdPersonnel:any,DateC: Date):Observable<any>{
    return  this.httpclient.get<Conges[]>(this.url+"/findDispoPersonnelByConges/"+IdPersonnel+"/"+DateC)
  }

}

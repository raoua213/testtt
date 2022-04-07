

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Classee } from '../models/classee';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  private url=environment.apiUrl;

  constructor(private httpclient: HttpClient) {

   }

  

  public GetAllClasses():Observable<Classee[]>{
    return this.httpclient.get<Classee[]>(`${this.url}/findAllClasses`);

  }

  public AddClasse(activite:Classee):Observable<any>{
    return this.httpclient.post(this.url+"/addClasse",activite);
  }

  public updateClasse( classe:Classee): Observable<any> {
    return this.httpclient.put(this.url+"/updateClasses", classe);
  }
    public DeleteClasse(id:any):Observable<any>{
    return this.httpclient.delete(this.url+"/deleteCalsseByID"+id)
  }

  public FindClasseById(id:any):Observable<any>{
    return  this.httpclient.get<Classee>(this.url+"findClasseById"+id)
  }








}

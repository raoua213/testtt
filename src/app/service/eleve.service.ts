import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eleve } from '../models/eleve';


@Injectable({
  providedIn: 'root'
})
export class EleveService {
  private url=environment.apiUrl;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data'}) };

  constructor(private httpclient: HttpClient) {

   }

   public GetAllEleve():Observable<Eleve[]>{
     return this.httpclient.get<Eleve[]>(this.url+"/getAllEleves");

   }

 

   public AddEleve(employe: any): Observable<any> {
    return this.httpclient.post<any>(`${this.url}/addEleve`, employe);
  }

   public updateEleve( eleve:any): Observable<any> {
    return this.httpclient.put<any>(this.url+"/updateEleve", eleve);
  }
  public updateEleve2( eleve:Eleve): Observable<any> {
    return this.httpclient.put<Eleve>(this.url+"/updateEleve2", eleve);
  }

   public DeleteEleve(id:any):Observable<any>{
     return this.httpclient.delete<any>(this.url+"/deleteEleveById/"+id)
   }

   public FindEleveById(id:any):Observable<any>{
     return  this.httpclient.get<Eleve>(this.url+"/getEleveById/"+id)
   }


   public Findbyclasse(id:any):Observable<any>{
    return  this.httpclient.get<Eleve>(this.url+"/findEleveByClasse/"+id)
  }

  public checkEleve(form:any):Observable<any>{
    console.log(form)
    return this.httpclient.get<any>(this.url+"/findEleveUnique/"+form.nom+"/"+form.prenom+"/"+form.tel_parent+"/"+form.date_nais);

  }
  public FindClasseByEleveId(id:any):Observable<any>{
    return  this.httpclient.get<any>(this.url+"/getClasseByIdEleve/"+id)
  }


  
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Emploi } from '../models/emploi';

@Injectable({
  providedIn: 'root'
})
export class EmploiService {

  private url=environment.apiUrl;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data'}) };

  constructor(private httpclient: HttpClient) {

   }

   public GetAllEmploi():Observable<Emploi[]>{
     return this.httpclient.get<Emploi[]>(this.url+"/findAllEmplois");

   }

 

   public AddEmploi(employe: any): Observable<any> {
    return this.httpclient.post<any>(`${this.url}/addEmploi`, employe);
  }

   public updateEmploi( Emploi:any): Observable<any> {
    return this.httpclient.put<any>(this.url+"/updateEmploi", Emploi);
  }
  public updateEmploi2( Emploi:Emploi): Observable<any> {
    return this.httpclient.put<Emploi>(this.url+"/updateEmploi2", Emploi);
  }

   public DeleteEmploi(id:any):Observable<any>{
     return this.httpclient.delete<any>(this.url+"/deleteEmploiById/"+id)
   }

   public FindEmploiById(id:any):Observable<any>{
     return  this.httpclient.get<Emploi>(this.url+"/findEmploiById/"+id)
   }


   public Findbyclasse(id:any):Observable<any>{
    return  this.httpclient.get<Emploi>(this.url+"/findEmploiByClasse/"+id)
  }

}

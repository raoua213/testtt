import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eleve } from '../models/eleve';


@Injectable({
  providedIn: 'root'
})
export class EleveService {
  private url=environment.apiUrl;

  constructor(private httpclient: HttpClient) {

   }

   public GetAllEleve():Observable<Eleve[]>{
     return this.httpclient.get<Eleve[]>(this.url+"/findAllEleves");

   }

   public AddEleve(eleve:Eleve):Observable<any>{
     return this.httpclient.post(this.url+"/addEleve",eleve);
   }

   public updateEleve( eleve:Eleve): Observable<any> {
    return this.httpclient.put(this.url+"/updateEleve", eleve);
  }

   public DeleteEleve(id:any):Observable<any>{
     return this.httpclient.delete(this.url+"/deleteEleveById"+id)
   }

   public FindEleveById(id:any):Observable<any>{
     return  this.httpclient.get<Eleve>(this.url+"findEleve"+id)
   }


   public Findbyclasse(id:any):Observable<any>{
    return  this.httpclient.get<Eleve>(this.url+"findEleveByClasse"+id)
  }



  
}

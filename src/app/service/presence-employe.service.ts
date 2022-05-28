import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PresenceEmp } from '../models/presence-emp';

@Injectable({
  providedIn: 'root'
})
export class PresenceEmployeService {

  private url=environment.apiUrl;

  constructor(private httpclient: HttpClient) {

   }

   public AddPemploye(pemp:PresenceEmp):Observable<any>{
    return this.httpclient.post(this.url+"/addPresence_personnel",pemp);
  }

  public updatePemploye( pemploye:PresenceEmp): Observable<any> {
    return this.httpclient.put(this.url+"/updatePresence_personnel", pemploye);
  }


  public Deletepemp(id:number):Observable<any>{
    return this.httpclient.delete(this.url+"/deletePresencePersonnelByID"+id)
  }

  public FindEmpByEtat(etat:boolean):Observable<any>{
    return  this.httpclient.get<PresenceEmp>(this.url+"findByEtat"+etat)
  }

 
  public GetAllpemp():Observable<any>{
    return this.httpclient.get<PresenceEmp[]>(this.url+"/findAllPresence_personnels");

  }
  

  


}

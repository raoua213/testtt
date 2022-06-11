import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mouvement } from '../models/mouvement';

@Injectable({
  providedIn: 'root'
})
export class MouvementService {

  private url=environment.apiUrl;
  constructor(private httpclient: HttpClient) { }


  public GetAllMouvement():Observable<Mouvement[]>{
    return this.httpclient.get<Mouvement[]>(`${this.url}/findAllMouvements`);

  }

  public AddMouvement(mouv:Mouvement):Observable<any>{
    return this.httpclient.post(this.url+"/addMouvement",mouv);
  }

  public updateMouvement( classe:Mouvement): Observable<any> {
    return this.httpclient.put(this.url+"/updateMouvement", classe);
  }
   
 
  public DeleteMouvement(id:number):Observable<any>{
    return this.httpclient.delete(this.url+"/deleteMouvement/"+id)
  }


  public FindMouvementById(id:any):Observable<any>{
    return  this.httpclient.get<Mouvement>(this.url+"/findMouvementById/"+id)
  }

  public findAllMouvement_Date(DateDb:any,dateF:any):Observable<any>{
    return  this.httpclient.get<Mouvement>(this.url+"/AllMouvementDuMois/"+DateDb+"/"+dateF)
  }
}

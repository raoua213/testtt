import { FicheDePaie } from './../models/fiche-de-paie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FicheDPService {
  private url=environment.apiUrl;

  constructor(private httpclient: HttpClient) {

   }


   public GetAllFicheDePaie():Observable<FicheDePaie[]>{
    return this.httpclient.get<FicheDePaie[]>(`${this.url}/findAllFiche`);

  }
 

  public AddFicheDePaie(employe: any): Observable<FicheDePaie> {
    return this.httpclient.post<FicheDePaie>(`${this.url}/addFiche`, employe);
  }
  

  
  public deleteFicheDePaie(employeeId: number): Observable<void> {
    return this.httpclient.delete<void>(`${this.url}/deleteFicheById/${employeeId}`);
  }

  public FindFicheDePaieById(id:any):Observable<any>{
    return  this.httpclient.get<FicheDePaie>(this.url+"/findFicheById/"+id)
  }

  public FindFDPByIdPersonnel(id:any):Observable<any>{
    return  this.httpclient.get<FicheDePaie>(this.url+"/findFicheByIdPersonnel/"+id)
  }

  public FindFDPByIdPersonnel_date(id:any,date:any):Observable<any>{
    return  this.httpclient.get<FicheDePaie>(this.url+"/findFicheByIdPersonnel_Date/"+id + date)
  }


  public findAllSalaires_Date(DateDb:any,dateF:any):Observable<any>{
    return  this.httpclient.get<FicheDePaie>(this.url+"/findAllSalaires_Date/"+DateDb+"/"+dateF)
  }

}

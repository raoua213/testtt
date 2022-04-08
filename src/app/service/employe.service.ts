import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employe } from '../models/employe';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  private url=environment.apiUrl;

  constructor(private httpclient: HttpClient) {

   }


  public GetAllEmp():Observable<Employe[]>{
    return this.httpclient.get<Employe[]>(`${this.url}/getAllPersonnels`);

  }
 

  public AddEmp(employe: Employe): Observable<Employe> {
    return this.httpclient.post<Employe>(`${this.url}/addPersonnel`, employe);
  }
  

  public updateEmploye( employe:Employe): Observable<any> {
    return this.httpclient.put(this.url+"/updatePersonnel", employe);
  }

  
  public deleteEmployee(employeeId: number): Observable<void> {
    return this.httpclient.delete<void>(`${this.url}/deletePersonnelById/${employeeId}`);
  }

  public FindEmpById(id:number):Observable<any>{
    return  this.httpclient.get<Employe>(this.url+"/getPersonnelById/"+id)
  }


  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url: string=environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  public login(admin:Admin){
    return this.httpClient.post<Admin>(`${this.url}/login`,admin)
  }
}

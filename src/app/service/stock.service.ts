import { Stock } from './../models/stock';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private url=environment.apiUrl;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data'}) };

  constructor(private httpclient: HttpClient) {

   }
   public getAllStock():Observable<Stock[]>{
    return  this.httpclient.get<Stock[]>(this.url+"/findAllStock")
  }

   public AddStock(stock: Stock): Observable<Stock> {
    return this.httpclient.post<Stock>(`${this.url}/addStock`, stock);
  }
  
  public updateStock( stock:any): Observable<any> {
    return this.httpclient.put<any>(this.url+"/updateStock", stock);
  }
 
  public FindStockById(id:any):Observable<any>{
    return  this.httpclient.get<Stock>(this.url+"/findStockById/"+id)
  }


 

  public DeleteStock(id:any):Observable<any>{
    return this.httpclient.delete<any>(this.url+"/deleteStockById/"+id)
  }
}


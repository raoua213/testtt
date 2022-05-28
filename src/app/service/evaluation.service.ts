import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evaluation } from '../models/evaluation';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private url=environment.apiUrl;

  constructor(private httpclient: HttpClient) {

   }


  public findEvaluationByElAc(idEleve:any,idAct:any):Observable<Evaluation[]>{
    return this.httpclient.get<Evaluation[]>(`${this.url}/findEvaluationByIDEL&IDACT/${idEleve} ${idAct}`);

  }

  public addEvaluation(evaluation:Evaluation):Observable<any>{
    return this.httpclient.post(this.url+"/addEvaluation",evaluation);
  }

  public updateEvaluation( evaluation:Evaluation): Observable<any> {
    return this.httpclient.put(this.url+"/updateEvaluation", evaluation);
  }
   


  public findEvaluationById(id:any):Observable<any>{
    return  this.httpclient.get<Evaluation>(this.url+"/findEvaluationById/"+id)
  }
}

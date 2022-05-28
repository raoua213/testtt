import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url=environment.apiUrl;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data'}) };

  constructor(private httpclient: HttpClient) {

   }

   public AddArticle(article: Article): Observable<Article> {
    return this.httpclient.post<Article>(`${this.url}/addArticle`, article);
  }

  public getAllArticle():Observable<Article[]>{
    return  this.httpclient.get<Article[]>(this.url+"/findAllArticles")
  }

  public updateArticle( stock:any): Observable<any> {
    return this.httpclient.put<any>(this.url+"/updateArticle", stock);
  }
 
  public FindArticleById(id:any):Observable<any>{
    return  this.httpclient.get<Article>(this.url+"/findArticleById/"+id)
  }

  public DeleteArticle(id:any):Observable<any>{
    return this.httpclient.delete<any>(this.url+"/deleteArticleById/"+id)
  }


}

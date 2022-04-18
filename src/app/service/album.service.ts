import { Album } from './../models/album';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private url=environment.apiUrl;
  constructor(private httpclient: HttpClient) { }

  public AddAlbum(album:any):Observable<any>{
    return this.httpclient.post(this.url+"/image/addAlbum",album);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private http: HttpClient) { }

  public getData(): Observable<any> {
    return this.http.get<any>(`https://platform.fintacharts.com`)
  }
}

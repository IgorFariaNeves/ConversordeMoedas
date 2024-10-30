import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvercaogeralService {
  constructor(private http: HttpClient) { }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + environment.api_url
      })
    };
  }

  listarConversao(baseCurrency: string): Observable<any> {
    const url = `${environment.api_url}latest/${baseCurrency}`;
    return this.http.get(url, this.getHeaders());
  }
}
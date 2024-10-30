import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvercaoDiretaService {

  constructor(private http: HttpClient) {}

  listarConversao(): Observable<any> {
    const url = `${environment.api_url}/latest/USD`;
    return this.http.get<any>(url);
  }

  converterPar(moedaOrigem: string, moedaDestino: string, valor: number): Observable<any> {
    const url = `${environment.api_url}/pair/${moedaOrigem}/${moedaDestino}/${valor}`;
    return this.http.get<any>(url);
  }
}

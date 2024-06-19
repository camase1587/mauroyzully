import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarjeta, TarjetaResponse } from './interfaces/tarjeta';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private apiUrl = 'http://localhost:3000/tarjeta/';

  constructor(private http: HttpClient) { }

  getTarjetaData(idTarjeta: string): Observable<TarjetaResponse> {
    return this.http.get<TarjetaResponse>(`${this.apiUrl}${idTarjeta}`);
  }
}

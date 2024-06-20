import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invitado, Tarjeta, TarjetaResponse } from './interfaces/tarjeta';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private apiUrl = 'http://localhost:3000/tarjeta/';

  constructor(private http: HttpClient) { }

  getTarjetaData(idTarjeta: string): Observable<TarjetaResponse> {
    return this.http.get<TarjetaResponse>(`${this.apiUrl}${idTarjeta}`);
  }

  submitInvitados(idTarjeta: string, invitados: Invitado[]): Observable<any> {
    const body = { idTarjeta, invitados };
    console.log(body, 'body');

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}confirmar`, body, { headers });
  }
}

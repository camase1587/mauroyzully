import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invitado, Tarjeta, TarjetaResponse } from './interfaces/tarjeta';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private apiUrl = 'http://92.204.129.156:3000/api/tarjetaboda';

  constructor(private http: HttpClient) { }

  getTarjetaData(idTarjeta: string): Observable<TarjetaResponse> {
    return this.http.get<TarjetaResponse>(`${this.apiUrl}/${idTarjeta}`);
  }

  submitInvitados(idTarjeta: string, invitados: Invitado[]): Observable<any> {
    const body = { idTarjeta, invitados };
    // console.log(body, 'body');

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/confirmar`, body, { headers });
  }



  confirmarAsistencia(idTarjeta: string, estado:number): Observable<any> {
    // console.log(idTarjeta, estado);

    return this.http.post(`${this.apiUrl}/confirmar-asistencia`, {
      idTarjeta: idTarjeta,
      estado: estado
    });
  }

  addInvitado(invitado: any): Observable<any> {
    // console.log(invitado, 'este es el que envia');

    return this.http.post(`${this.apiUrl}/agregarInvitado`, invitado);
  }

  deleteInvitado(invitado: any): Observable<any> {
    // console.log('-----a-s-asdsad ', invitado);

    return this.http.delete(`${this.apiUrl}/eliminarInvitado/${invitado}`); // Asegúrate de que `invitado` tiene un campo `id`
  }

}

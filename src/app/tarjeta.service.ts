import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private apiUrl = 'http://localhost:3000/tarjeta/';

  constructor(private http: HttpClient) { }

  getTarjetaData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

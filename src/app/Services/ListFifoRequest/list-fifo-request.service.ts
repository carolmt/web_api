import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL_BASE = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
})
export class ListFifoRequestService {

  httpClient = inject(HttpClient);

  constructor() { }

  //Selecciona un elemento de la lista de mensajes preparados y lo inserta en el FIFO
  getInsertFifo(numMsg:number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/fifos/'+numMsg, { headers }).pipe(res => res);
  }

  //mostrar variables del mensaje cargado
  getVariablesAndValues(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/lstvar', { headers }).pipe(res => res);
  }
}

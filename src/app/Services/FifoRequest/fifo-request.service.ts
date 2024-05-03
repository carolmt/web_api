import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../../Interfaces/variablesValues.interface';

const URL_BASE = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
})
export class FifoRequestService {

  httpClient = inject(HttpClient);

  constructor() { }

  //borrar la cola del fifo incluida la imágen actual.
  getEmptyFifo(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/fifoe', { headers }).pipe(res => res);
  }

  //cuenta mensajes en la cola del fifo.
  getCountMsgFifo(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/fifoc', { headers }).pipe(res => res);
  }

//Obtener la previsualización de un elemento del FIFO
  getPrevImgColor(num:number, color: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/fifop/'+num + '/'+color, { responseType: 'blob' }).pipe(res => res);
  }

  //Lista de mensajes en el FIFO
  getMsgListFifo(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/fifol', { headers }).pipe(res => res);
  }

  getNextMsgFifo(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/fifon', { headers }).pipe(res => res);
  }

  putChargeFifo(fifo: List[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.put(URL_BASE + '/impf', fifo, { headers }).pipe(res => res);
  }
}

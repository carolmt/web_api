import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChargeFile, List } from '../../Interfaces/variablesValues.interface';

const URL_BASE = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
})
export class ListRequestService {

  httpClient = inject(HttpClient);

  constructor() { }

  //Vaciar la lista de mensajes preparados
  getEmptyList(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/liste', { headers }).pipe(res => res);
  }

  //Obtener la previsualización de un elemento de la lista de mensajes preparados
  getPrevImgColor(num:number, color: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/listp/'+num + '/'+color, { responseType: 'blob' }).pipe(res => res);
  }

  //Número de mensajes en la lista preparados
  getCountMsgList(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/listc', { headers }).pipe(res => res);
  }

  //Lista de mensajes preparados
  getMsgList(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/listl', { headers }).pipe(res => res);
  }

  getPrintSelected(num: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/lists/'+num, { headers }).pipe(res => res);
  }

  putChargeList(list: List[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.put(URL_BASE + '/impl', list, { headers }).pipe(res => res);
  }
}

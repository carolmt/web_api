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

  getEmptyList(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/liste', { headers }).pipe(res => res);
  }

  getPrevImgColor(num:number, color: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/listp/'+num + '/'+color, { responseType: 'blob' }).pipe(res => res);
  }

  getCountMsgList(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/listc', { headers }).pipe(res => res);
  }

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

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

  getInsertFifo(numMsg:number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/fifos/'+numMsg, { headers }).pipe(res => res);
  }
}

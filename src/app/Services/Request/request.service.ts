import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostProps } from '../../Interfaces/post.interface';
import { ChargeFile, Variable } from '../../Interfaces/variablesValues.interface';
import { PLC3, PLCList } from '../../Interfaces/plcList.interface';

const URL_BASE = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  httpClient = inject(HttpClient);

  constructor() { }

  getPrinterStatus(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE, { headers }).pipe(res => res);
  }

//Para la impresion
  getStopPrinting(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/stop', { headers }).pipe(res => res);
  }

  //Muestra la imagen cargada o los colores que pinta
  getImgFromCurrentMessage(color:string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/prev/'+color, { responseType: 'blob' }) ;
  }

  //Muestra las variables y valores de la imagen cargada.
  getVariablesAndValues(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/lstvar', { headers }).pipe(res => res);
  }

//mostrar los mensajes del controlador.
  getControllerMessages(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/lstlay', { headers }).pipe(res => res);
  }

  //borra el mensaje para siempre.
  getDeleteMsg(msg: string): Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/del/'+msg, { headers }).pipe(res => res);
  }

  
  getPlcLogs(plcNum:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
      return this.httpClient.get(URL_BASE + '/plclst/'+plcNum, { headers }).pipe(res => res);
    
  }

  getImgFromCtrl(file:string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/prevl/'+file, { responseType: 'blob' }) ;
  }

  getListOfImg(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/lstimg', { headers }).pipe(res => res);
  }

  //metodos PUT
  putUpdatePropierties(propierty: PostProps) { //no va bien ni en el postman
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.put(URL_BASE + '/api/layout/', propierty, { headers }).pipe(res => res);
  }
  
  putUpdateCurrentVariables(variables: Variable[]): Observable<any> { 
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json; charset=UTF-8',
    });
    return this.httpClient.put(URL_BASE + '/vars', variables,{headers}).pipe(res => res);
  }

  putNewMsgAndVariables(file: ChargeFile): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.put(URL_BASE + '/impr', file, { headers }).pipe(res => res);
  }

  putListOfValuesPlc(registros: PLC3[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.put(URL_BASE + '/plcwrt', registros, { headers }).pipe(res => res);
  }
  
}
 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrder, DetallesOrden, Orden } from '../../Interfaces/baseDatos.interface';

const URL_BASE = 'http://localhost:8080/RestoServ/api'

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  httpClient = inject(HttpClient);

  constructor() { }

/*METODOS GET*/
                  // CATEGORIAS

  //obtener todas las categorias
  getAllCategories(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + "/categorias", { headers }).pipe(res => res);
  }

//obtener categoria específica
  getSpecificCategory(nameCat: string ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/categorias/' + nameCat, { headers }).pipe(res => res);
  }

          //PRODUCTOS

  //Obtener producto específico
  getProduct(product:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/categorias/' + product, { headers }).pipe(res => res);
  }

            //EMPLEADOS
  
  //Obtener empleado por id
  getEmployeeById(empl_id : number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/empleados/' + empl_id, { headers }).pipe(res => res);
  }

  //Obtener empleado por codigo auth
  getEmployeeByCode(code : number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/empleados/codigo/' + code, { headers }).pipe(res => res);
  }

  //Obtener empleado por codigo y nombre
  getEmployeeByCodeAndName(code : number, name: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/empleados/codigo/' + code + '?' + name, { headers }).pipe(res => res);
  }

          //ORDENES

  //Obtener todas las órdenes.
  getAllOrders(): Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/ordenes', { headers }).pipe(res => res);
  }

  //Obtener orden por id
  getORderById(ord_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
      return this.httpClient.get(URL_BASE + '/ordenes/'+ord_id, { headers }).pipe(res => res);
  }

        //CLIENTES

//Obtener cliente mediante telf
  getClientByTelf(telf : number): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.get(URL_BASE + '/clientes/' + telf, { responseType: 'blob' }) ;
  }

  
  /*METODOS POST*/

                  //DETALLE ORDENES

  //Agregar detalle de orden
  postOrderDetail(detail : DetallesOrden) {
    const headers = new HttpHeaders({
       'Content-Type': 'application/json; charset=UTF-8',
     });
     return this.httpClient.post(URL_BASE + '/detalleOrdenes', detail, { headers }).pipe(res => res);
  }

                  //ORDENES
//Agregar orden
  postNewOrder(order: CreateOrder): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    });
    return this.httpClient.post(URL_BASE + '/ordenes', order, { headers }).pipe(res => res);
  }

                //CLIENTES
  
//   //Cambio de los valores de algunas de las variables del mensaje actual
//   putUpdateCurrentVariables(variables: Variable[]): Observable<any> { 
//     const headers = new HttpHeaders({
//       'Content-Type' : 'application/json; charset=UTF-8',
//     });
//     return this.httpClient.put(URL_BASE + '/vars', variables,{headers}).pipe(res => res);
//   }

//   //Cambio del mensaje actual y sus variables
//   putNewMsgAndVariables(file: ChargeFile): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json; charset=UTF-8',
//     });
//     return this.httpClient.put(URL_BASE + '/impr', file, { headers }).pipe(res => res);
//   }

//   //Escribe una lista de valores en los registros del PLC
//   putListOfValuesPlc(registros: PLC3[]): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json; charset=UTF-8',
//     });
//     return this.httpClient.put(URL_BASE + '/plcwrt', registros, { headers }).pipe(res => res);
//   }
  
}
 
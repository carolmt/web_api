import { Injectable } from '@angular/core';
import { DetallesOrden, Orden, Producto } from '../../Interfaces/baseDatos.interface';

@Injectable({
  providedIn: 'root'
})
export class DataSaverService {

  private ordenDetail: DetallesOrden[] = [];
  private orden: Orden[] = [];
  private producto: Producto[] = [];

  constructor() { }

  getPriceProd(prodiId: number): number {
    return this.producto[prodiId].precio;
  }
}

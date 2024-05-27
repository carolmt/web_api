import { Component, OnInit } from '@angular/core';
import { DetallesInfo, Orden, OrdenDone, OrdenInfo } from '../../Interfaces/baseDatos.interface';
import { RequestService } from '../../Services/Request/request.service';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-cocina',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './cocina.component.html',
  styleUrl: './cocina.component.css'
})
export class CocinaComponent implements OnInit{

  pedidos: OrdenInfo[] = [];
  detallesOrden: DetallesInfo[] = [];
  pedido: Orden | undefined;

  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
    this.allOrders();
}

allOrders():void {
  this.requestService.getOrdersNotDone().subscribe({
    next: (res) => {
      this.pedidos = res;
      this.detallesOrden = res[0].detallesOrden;
      console.log(res);
    },
    error: (err) => {
      console.log(err);
    }
  });
}

orderDone(ordenId: number) {

  const pedido: OrdenDone = {
    ordenId: ordenId,
    hecho: true
  }

  this.requestService.putUpdateOrder(ordenId, pedido).subscribe({
    next: (res) => {
      console.log(res);
      this.pedido = res;
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}
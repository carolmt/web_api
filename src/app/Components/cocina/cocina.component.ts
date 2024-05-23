import { Component, OnInit } from '@angular/core';
import { DetallesInfo, Orden, OrdenInfo } from '../../Interfaces/baseDatos.interface';
import { RequestService } from '../../Services/Request/request.service';

@Component({
  selector: 'app-cocina',
  standalone: true,
  imports: [],
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
  this.requestService.getAllOrders().subscribe({
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

removePedido(ordenId: number) {
  const index = this.pedidos.findIndex(pedido => pedido.ordenId === ordenId);
  if (index > -1) {
    this.pedidos.splice(index, 1);
  }
}
}
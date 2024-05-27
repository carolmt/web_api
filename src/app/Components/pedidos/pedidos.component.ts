import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { RequestService } from '../../Services/Request/request.service';
import { DetallesInfo, OrdenInfo } from '../../Interfaces/baseDatos.interface';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {

  pedidos: OrdenInfo[] = [];
  detallesOrden: DetallesInfo[] = [];

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
  dateFormatter(value: Date | string | null): string {
    if (!value) return '';

    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses son 0-indexados
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}-${month} ${hours}:${minutes}`;
  }

  deleteOrder(id: number): void {
  this.requestService.deleteOrderById(id).subscribe({
    next: (res) => {
      console.log(res);
      this.allOrders();
    },
    error: (err) => {
      console.log(err);
    }
  });
  }
}

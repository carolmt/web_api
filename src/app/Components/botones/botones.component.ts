import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProductsComponent } from '../products/products.component';
import { ClientComponent } from '../clients/client.component';
import { PedidosComponent } from '../pedidos/pedidos.component';
import { CocinaComponent } from '../cocina/cocina.component';

@Component({
  selector: 'app-botones',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductsComponent, ClientComponent, PedidosComponent, CocinaComponent],
  templateUrl: './botones.component.html',
  styleUrl: './botones.component.css'
})
export class BotonesComponent {

  constructor(private router: Router) { }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }

  navigateToClient(): void {
    this.router.navigate(['/client']);
  }

  navigateToOrders(): void {
    this.router.navigate(['/pedidos']);
  }

  navigateToKitchen(): void {
    this.router.navigate(['/cocina']);
  }
}

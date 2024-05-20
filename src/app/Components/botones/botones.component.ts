import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProductsComponent } from '../products/products.component';
import { ClientComponent } from '../clients/client.component';
import { OrderComponent } from '../order/order.component';
import { KitchenComponent } from '../kitchen/kitchen.component';

@Component({
  selector: 'app-botones',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductsComponent, ClientComponent, OrderComponent, KitchenComponent],
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
    this.router.navigate(['/order']);
  }

  navigateToKitchen(): void {
    this.router.navigate(['/kitchen']);
  }
}

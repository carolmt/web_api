import { Component } from '@angular/core';
import { ClientComponent } from '../clients/client.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ProductsComponent } from '../products/products.component';
import { KitchenComponent } from '../kitchen/kitchen.component';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ClientComponent, RouterModule, RouterOutlet, ProductsComponent, KitchenComponent, OrderComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private router: Router) { }

  navigateTo(page: string): void {
    this.router.navigate(['/' + page]);
  }
}
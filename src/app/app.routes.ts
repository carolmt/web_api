import { Routes } from '@angular/router';

export const routes: Routes = [
  //LazyMode !!
  {
    path: 'inicio',
    loadComponent: () =>
      import('./Components/inicio/inicio.component').then(
        (c) => c.InicioComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./Components/products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
  {
    path: 'client',
    loadComponent: () =>
      import('./Components/clients/client.component').then(
        (c) => c.ClientComponent
      ),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./Components/orders/orders.component').then(
        (c) => c.OrdersComponent
      ),
  },
  {
    path: 'kitchen',
    loadComponent: () =>
      import('./Components/kitchen/kitchen.component').then(
        (c) => c.KitchenComponent
      ),
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

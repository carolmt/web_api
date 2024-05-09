import { Routes } from '@angular/router';
import { ProductsComponent } from './Components/products/products.component';
import { ClientComponent } from './Components/clients/client.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { KitchenComponent } from './Components/kitchen/kitchen.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { InicioComponent } from './Components/inicio/inicio.component';

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
  {
    path: 'settings',
    loadComponent: () =>
      import('./Components/settings/settings.component').then(
        (c) => c.SettingsComponent
      ),
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

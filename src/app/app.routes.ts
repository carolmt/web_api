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
    path: 'order',
    loadComponent: () =>
      import('./Components/order/order.component').then(
        (c) => c.OrderComponent
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

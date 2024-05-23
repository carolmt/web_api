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
  {path: 'pedidos',
    loadComponent: () =>
      import('./Components/pedidos/pedidos.component').then(
        (c) => c.PedidosComponent
      
      ),
  },
  {
    path: 'cocina',
    loadComponent: () =>
      import('./Components/cocina/cocina.component').then(
        (c) => c.CocinaComponent
      ),
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

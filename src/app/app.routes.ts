import { Routes } from '@angular/router';
import { GeneralModeComponent } from './Components/general-mode/general-mode.component';
import { FifoModeComponent } from './Components/fifo-mode/fifo-mode.component';
import { ListModeComponent } from './Components/list-mode/list-mode.component';
import { ListFifoModeComponent } from './Components/list-fifo-mode/list-fifo-mode.component';
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
    path: 'generalMode',
    loadComponent: () =>
      import('./Components/general-mode/general-mode.component').then(
        (c) => c.GeneralModeComponent
      ),
  },
  {
    path: 'fifoMode',
    loadComponent: () =>
      import('./Components/fifo-mode/fifo-mode.component').then(
        (c) => c.FifoModeComponent
      ),
  },
  {
    path: 'listMode',
    loadComponent: () =>
      import('./Components/list-mode/list-mode.component').then(
        (c) => c.ListModeComponent
      ),
  },
  {
    path: 'listFifoMode',
    loadComponent: () =>
      import('./Components/list-fifo-mode/list-fifo-mode.component').then(
        (c) => c.ListFifoModeComponent
      ),
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

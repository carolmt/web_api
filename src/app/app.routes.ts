import { Routes } from '@angular/router';
import { GeneralModeComponent } from './Components/general-mode/general-mode.component';
import { FifoModeComponent } from './Components/fifo-mode/fifo-mode.component';
import { ListModeComponent } from './Components/list-mode/list-mode.component';
import { ListFifoModeComponent } from './Components/list-fifo-mode/list-fifo-mode.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { InicioComponent } from './Components/inicio/inicio.component';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'generalMode', component: GeneralModeComponent},
    {path: 'fifoMode', component: FifoModeComponent},
    {path: 'listMode', component: ListModeComponent},
    {path: 'listFifoMode', component: ListFifoModeComponent},
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
];

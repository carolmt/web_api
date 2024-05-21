import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { BotonesComponent } from './Components/botones/botones.component';
import { ClientComponent } from './Components/clients/client.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductsComponent } from './Components/products/products.component';
import { KitchenComponent } from './Components/kitchen/kitchen.component';
import { OrdersComponent } from './Components/orders/orders.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    BotonesComponent, 
    ClientComponent, 
    InicioComponent, 
    FlexLayoutModule, 
    ProductsComponent,
    KitchenComponent,
    OrdersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RestoServ';
}

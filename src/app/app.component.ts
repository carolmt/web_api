import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { BotonesComponent } from './Components/botones/botones.component';
import { ClientComponent } from './Components/clients/client.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    BotonesComponent, 
    ClientComponent, 
    InicioComponent, 
    FlexLayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'limitronic_impresoras';
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { BotonesComponent } from './Components/botones/botones.component';
import { FifoModeComponent } from './Components/fifo-mode/fifo-mode.component';
import { InicioComponent } from './Components/inicio/inicio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BotonesComponent, FifoModeComponent, InicioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'limitronic_impresoras';
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BotonesComponent } from '../botones/botones.component';
import { FifoModeComponent } from '../fifo-mode/fifo-mode.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet,BotonesComponent, FifoModeComponent, InicioComponent, HeaderComponent],
  templateUrl: './inicio.component.html'
})
export class InicioComponent {

}

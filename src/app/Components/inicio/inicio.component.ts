import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BotonesComponent } from '../botones/botones.component';
import { ClientComponent } from '../clients/client.component';
import { HeaderComponent } from '../header/header.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet,BotonesComponent, ClientComponent, InicioComponent, HeaderComponent, UserComponent],
  templateUrl: './inicio.component.html'
})
export class InicioComponent {

}

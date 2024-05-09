import { Component } from '@angular/core';
import { BotonesComponent } from '../botones/botones.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [BotonesComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  isLoggedIn = false;
}

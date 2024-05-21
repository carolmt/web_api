import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-kitchen',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent {

}

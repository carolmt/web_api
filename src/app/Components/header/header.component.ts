import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { InicioComponent } from '../inicio/inicio.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, InicioComponent, SettingsComponent, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router) {}
  
  navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GeneralModeComponent } from '../general-mode/general-mode.component';
import { FifoModeComponent } from '../fifo-mode/fifo-mode.component';
import { ListModeComponent } from '../list-mode/list-mode.component';
import { ListFifoModeComponent } from '../list-fifo-mode/list-fifo-mode.component';

@Component({
  selector: 'app-botones',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GeneralModeComponent, FifoModeComponent, ListModeComponent, ListFifoModeComponent],
  templateUrl: './botones.component.html',
  styleUrl: './botones.component.css'
})
export class BotonesComponent {

  constructor(private router: Router) { }

  navigateToGeneralMode(): void {
    this.router.navigate(['/generalMode']);
  }

  navigateToFifoMode(): void {
    this.router.navigate(['/fifoMode']);
  }

  navigateToListMode(): void {
    this.router.navigate(['/listMode']);
  }

  navigateToListFifoMode(): void {
    this.router.navigate(['/listFifoMode']);
  }
}

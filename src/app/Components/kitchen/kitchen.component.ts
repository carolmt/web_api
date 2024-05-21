import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-kitchen',
  standalone: true,
  imports: [FormsModule , CommonModule, NavComponent],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent implements OnInit{

  msgInsert = '';
  msgNum: number = 0;
  show = false;
 // dataVariable: Variable[] = [];
  mssgVariable = '';


  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    throw new Error('Fifo List');
  }
}

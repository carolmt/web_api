import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  public ipAdress: string = '';
  newIp= '';
  ipMsg = '';

  constructor() {
  }

  setIp(){
    if(this.newIp.trim() == ''){
      this.ipMsg = 'Por favor ingrese una dirección IP';
  }
  else {
    this.ipAdress = this.newIp;
    this.ipMsg = 'Dirección IP actualizada';
    console.log(this.ipAdress, this.newIp);
  }
}
}


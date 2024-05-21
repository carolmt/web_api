import { Component, OnInit } from '@angular/core';
import { BotonesComponent } from '../botones/botones.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../Services/Request/request.service';
import { Empleado, Orden } from '../../Interfaces/baseDatos.interface';
import { AuthService } from '../../Services/AuthService/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [BotonesComponent,
            FlexLayoutModule, 
            FormsModule,
            ReactiveFormsModule 
            ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  isLoggedIn = false;
  styleImage = 'pizza';

  //gestion inicio sesion
  codeEmpl= 0;
  nameEmpl = '';
  form : FormGroup;
  mssgAuth = '';
  empleado: Empleado| null = null;
  emplId = 0;


  constructor(private formBuilder: FormBuilder, private requestService : RequestService, private authService: AuthService){
    this.form = new FormGroup({
      codigo: new FormControl(''),
      nomEmpl: new FormControl('')
    })
  }

  ngOnInit(): void {
    console.log('UserComponent');
  }

  unsplashClass(): any {
    return {
      'min-height': '100%',
      background: `url("https://source.unsplash.com/random/1200x900?"${this.styleImage}) no-repeat center center`,
      'background-size': 'cover',
      position: 'relative',
    };
  }
  login(event: Event): any {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.codeEmpl = value.codigo; 
      this.nameEmpl = value.nomEmpl; // Actualizar codeEmpl con el valor ingresado en el formulario
      this.iniciarSesion();
    }
  }

  iniciarSesion():void {
    let codeStatus = 0;
      this.requestService.getEmployeeByCodeAndName(this.codeEmpl, this.nameEmpl).subscribe({
        next: (res) => {
          codeStatus = res.code;
          if(codeStatus !== 400){
            this.isLoggedIn = true;
            this.mssgAuth = '';
            this.empleado = res; // Guardar el empleado recibido de la respuesta
            this.emplId = res.emplId; // Guardar el emplId del empleado
            this.authService.login(res);
          } else {
              this.mssgAuth = 'Nombre o código de usuario incorrecto.'
          } 
        },
          error: (err) => {
            console.log(err);
            this.mssgAuth = 'Nombre o código de usuario incorrecto.'
        }
      });
  }

}

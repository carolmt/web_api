import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BotonesComponent } from '../botones/botones.component';
import { NavComponent } from '../nav/nav.component';
import { Cliente, CreateOrder, EmpleadoOrder } from '../../Interfaces/baseDatos.interface';
import { RequestService } from '../../Services/Request/request.service';
import { AuthService } from '../../Services/AuthService/auth.service';
import { OrderService } from '../../Services/OrdenService/orden.service';
import { Router, RouterOutlet } from '@angular/router';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, BotonesComponent, NavComponent, RouterOutlet, ProductsComponent,],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  cliente: Cliente| null = null;
  empl: EmpleadoOrder | null = null;
  clientForm: FormGroup;
  clientFound = false;
  emplId = 0;
  msgClientFound = '';


  constructor(private router: Router, private authService: AuthService, private requestService: RequestService, private orderService: OrderService) {
    this.clientForm = new FormGroup({
      telf: new FormControl(''),
      nom_cli: new FormControl(''),
      direccion: new FormControl(''),
      comentario: new FormControl('')
    });
  }

  ngOnInit(): void { 
    this.authService.empleado$.subscribe(empl => {
      this.empl = empl;
    });
    console.log('codigo: ' + this.empl?.emplId)
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }

  lookForClient(telf: number): void {
    this.requestService.getClientByTelf(telf).subscribe({
      next: (res) => {
        if (res) {
          this.cliente = res;
          this.clientForm.patchValue({
            nom_cli: res.nom_cli,
            direccion: res.direccion,
            comentario: res.comentario
          });
          this.clientFound = true;
          this.msgClientFound = '';
        } else {
          this.msgClientFound = 'Cliente no encontrado, por favor, rellene los campos.';
          this.clientFound = false;
          this.clientForm.patchValue({ telf });
        }
      },
      error: (err) => {
        console.log(err);
        this.clientFound = false;
        this.msgClientFound = 'Error en la búsqueda del cliente.';
        this.clientForm.patchValue({ telf });
      }
    });
  }

  updateClient(cliente: Cliente): void {
    this.requestService.putUpdateClient(cliente).subscribe({
      next: (res) => {
        this.cliente = res;
        this.clientForm.patchValue({
          nom_cli: res.nom_cli,
          direccion: res.direccion,
          comentario: res.comentario
        });
        this.clientFound = true;
      },
      error: (err) => {
        console.log(err);
        this.clientFound = false;
      }
    });
  }

  createOrUpdateClient(): void {
    if (this.clientFound) {
      console.log('Cliente ya existente, actualizar si es necesario.');
      this.updateClient(this.clientForm.value);
    } else {
      const newClient: Cliente = this.clientForm.value;
      this.createClient(newClient);
    }
  }

  createClient(cliente: Cliente): void {
    this.requestService.postNewClient(cliente).subscribe({
      next: (res) => {
        if (res) {
          this.clientFound = false;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  createEmptyOrder(): void {

      let telf = this.clientForm.value.telf;
      let emplId = this.empl?.emplId || 0;

        const pedido: CreateOrder = {
          cliente: { telf: telf }, // Usar el teléfono del formulario para el cliente
          empleado: { emplId: emplId }, // Usar el ID del empleado
          detallesOrden: [] // Inicializar los detalles de la orden si es necesario
        };
        this.requestService.postNewOrder(pedido).subscribe({
          next: (res) => {
            console.log(res);
            this.orderService.setOrderId(res.ordenId);
          },
          error: (err) => {
            console.log(err);
          }
        });
    
  }

  
  // Método para prevenir el envío del formulario al presionar Enter
  preventEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }
}

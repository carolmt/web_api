import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../Services/Request/request.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import SpinnerComponent from '../spinner/spinner.component';
import { Categoria, DetallesOrden, Orden, OrdenOder, Producto, ProductoOrder } from '../../Interfaces/baseDatos.interface';
import { NavComponent } from '../nav/nav.component';
import { OrderService } from '../../Services/OrdenService/orden.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SpinnerComponent, NavComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  
  categorias: Categoria[] = [];
  productos: Producto[] = [];
  orden: Orden[] = [];
  detalleOrden: DetallesOrden[] = [];
  detailForm: FormGroup;
  prodSelected: ProductoOrder | null = null;
  ordenSelected: OrdenOder  | null = null;
  ordenId :number | null = null;

  constructor(private requestService: RequestService, private orderService: OrderService){
    this.detailForm = new FormGroup({
      cantidad: new FormControl(''),
      producto: new FormControl(''),
      orden: new FormControl('')
    
    })
  }

  ngOnInit(): void {
    this.getCategorias();
    this.orderService.orderId$.subscribe(orderId => {
      this.ordenId = orderId;
    });
  }

  public getCategorias(): void {
    this.requestService.getAllCategories().subscribe({
      next: (res) => {
        this.categorias = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getProducts(categoria: string):void {
    this.requestService.getSpecificCategory(categoria).subscribe({
      next: (res) => {
        this.productos = res.productos;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addProductToOrderDetail(prodId: number): void {
    if (!this.ordenId) {
      console.error('No se ha establecido ninguna orden ID');
      return;
    }

    const detail: DetallesOrden = {
      producto: { prodId: prodId },
      cantidad: 1,
      orden: { ordenId: this.ordenId }
    };

    this.requestService.postOrderDetail(detail).subscribe({
      next: (res) => {
        console.log('Detalle de orden agregado con éxito');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
}
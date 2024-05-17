import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListFifoRequestService } from '../../Services/ListFifoRequest/list-fifo-request.service';

@Component({
  selector: 'app-list-fifo-mode',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent implements OnInit{

  URL_BASE = 'http://localhost:8080/api';
  msgInsert = '';
  msgNum: number = 0;
  show = false;
 // dataVariable: Variable[] = [];
  mssgVariable = '';


  constructor(private listFifoRequest: ListFifoRequestService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    throw new Error('Fifo List');
  }

  insertMsgFifo(num: number): void {
    let codeStatus: number = 0;

    this.listFifoRequest.getInsertFifo(num).subscribe({
      next: (res) => {
        codeStatus = res.status;

   
          this.msgInsert = 'Mensaje insertado correctamente.';
        if(codeStatus == 400) {
          this.msgInsert = 'Mensaje seleccionado no válido.';
        }
          
      },
      error: (err) => {
        console.log(err);
        this.msgInsert = 'El sistema no está encendido / Modo FifoList desactivado.';
      }
    });
  }

  // variablesAndValues() {
  //   let codeStatus: number = 0;

  //   if(this.show == false){
  //     this.listFifoRequest.getVariablesAndValues().subscribe({
  //       next: (res) => {
  //         codeStatus = res.status;

  //         if (codeStatus !=400) {
  //           this.dataVariable = res;
  //         }else if (res == 's') {
  //           this.mssgVariable = 'Este mensaje no contiene variables';
  //         }
  //         else{
  //           this.mssgVariable = 'No se ha detectado mensaje cargado.';
  //         }
  //              this.cdr.detectChanges();  
  //     },
  //       error: (err) => {
  //         console.log(err);
  //         this.mssgVariable = 'El sistema no está encendido.';
  //       }
  //     })
  //     this.show = true;
  //   }else {
  //     this.show = false;
  //   }
    
  //}
}

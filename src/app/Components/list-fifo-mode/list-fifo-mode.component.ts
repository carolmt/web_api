import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListFifoRequestService } from '../../Services/ListFifoRequest/list-fifo-request.service';

@Component({
  selector: 'app-list-fifo-mode',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './list-fifo-mode.component.html',
  styleUrl: './list-fifo-mode.component.css'
})
export class ListFifoModeComponent implements OnInit{

  URL_BASE = 'http://localhost:8080/api';
  msgInsert = '';
  msgNum: number = 0;

  constructor(private listFifoRequest: ListFifoRequestService) { }

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
}

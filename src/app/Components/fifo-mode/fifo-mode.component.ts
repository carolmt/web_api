import { Component, OnInit } from '@angular/core';
import { FifoRequestService } from '../../Services/FifoRequest/fifo-request.service';
import { FormsModule } from '@angular/forms';
import { Element, Var } from '../../Interfaces/fifo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fifo-mode',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './fifo-mode.component.html',
  styleUrl: './fifo-mode.component.css'
})
export class FifoModeComponent implements OnInit{

  URL_BASE='http://localhost:8080/api';
  msgEmptyFifo = '';
  msgCount = '';
  colorTypes: Map<string, string> = new Map([
    ["Todos los colores", "i"],
    ["C1", "c1"],
    ["C2", "c2"],
    ["M1", "m1"],
    ["M2", "m2"],
    ["Y1", "y1"],
    ["Y2", "y2"],
    ["K1", "k1"],
    ["K2", "k2"],
  ]);
  colorTypesArray = Array.from(this.colorTypes.entries());
  numElement : number = 0;
  img: string | undefined;
  msgImg = '';
  files: Element[] = [];
  msgList= '';
  msgPrint = '';

  constructor(private fifoResquest: FifoRequestService) { }

ngOnInit(): void {
    console.log('fifo');
  }

  emptyFifo():void {
    let codeStatus: number | undefined;
    this.fifoResquest.getEmptyFifo().subscribe({
      next: (res) => {
        codeStatus = res.code;
        if (codeStatus === 200) {
          this.msgEmptyFifo = 'Cola de fifo vaciada correctamente.';
        } else {
          this.msgEmptyFifo = 'No se ha podido vaciar la cola de fifo.';
        }
      },
      error: (err) => {
        console.log(err);
        this.msgEmptyFifo = 'El sistema no está encendido.';
      }
    });
  }

  countMsgs(): void {
    let codeStatus: number | undefined;
    this.fifoResquest.getCountMsgFifo().subscribe({
      next: (res) => {
        codeStatus = res.code;
        if (codeStatus !== 400) {
          this.msgCount = 'La cola de fifo tiene ' + (res) + ' mensajes.';
        } else {
          this.msgCount = 'Cola de fifo vacía.';
        }
      },
      error: (err) => {
        console.log(err);
        this.msgCount = 'El sistema no está modo Fifo.';
      }
    });
  }

  visualizeElement(numElement: number, color:string): void {
    this.fifoResquest.getPrevImgColor(numElement, color).subscribe({
      next: (res) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.img = reader.result as string;
        };
        if(res) {
          reader.readAsDataURL(res);
        } else {
          this.msgImg = 'No se puede ver la imagen seleccionada.';   
        }
      },
      error: (err) => {
        this.msgImg = 'No se puede ver la imagen seleccionada.';
      }
    });
  }

  listMessages(): void {

    this.fifoResquest.getMsgListFifo().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.files = res;
        }else {
          this.files = [];
          this.msgList = 'La lista de mensajes de fifo está vacía.';
        }
      },
      error: (err) => {
        this.msgList = 'El sistema está apagado o modo fifo desactivado.';
      }
    });
  }

  printNextMsg(): void {

    let codeStatus: number | undefined;

    this.fifoResquest.getNextMsgFifo().subscribe({
      next:(res) => {
        codeStatus = res.code;
        if (codeStatus === 200) {
          this.msgPrint = 'Siguiente mensaje enviado correctamente.';
        } else {
          this.msgPrint = 'No había siguiente mensaje en cola fifo.';
        }
      },
      error: (err) => {
        this.msgPrint = 'El sistema está apagado o modo fifo desactivado.';
      }
  });
}
}

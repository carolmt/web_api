import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BotonesComponent } from '../botones/botones.component';
import { NavComponent } from '../nav/nav.component';
import { Cliente, CreateOrder, EmpleadoOrder } from '../../Interfaces/baseDatos.interface';
import { RequestService } from '../../Services/Request/request.service';
import { AuthService } from '../../Services/AuthService/auth.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, BotonesComponent, NavComponent],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  cliente: Cliente| null = null;
  empl: EmpleadoOrder | null = null;
  clientForm: FormGroup;
  clientFound = false;
  emplId = 0;


  constructor(private authService: AuthService, private requestService: RequestService) {
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
        } else {
          this.clientFound = false;
          this.clientForm.patchValue({ telf });
        }
      },
      error: (err) => {
        console.log(err);
        this.clientFound = false;
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
          this.clientForm.reset();
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
          },
          error: (err) => {
            console.log(err);
          }
        });
    
  }
}


//   msgEmptyFifo = '';
//   msgCount = '';
//   colorTypes: Map<string, string> = new Map([
//     ["Todos los colores", "i"],
//     ["C1", "c1"],
//     ["C2", "c2"],
//     ["M1", "m1"],
//     ["M2", "m2"],
//     ["Y1", "y1"],
//     ["Y2", "y2"],
//     ["K1", "k1"],
//     ["K2", "k2"],
//   ]);
//   colorTypesArray = Array.from(this.colorTypes.entries());
//   numElement : number = 0;
//   img: string | undefined;
//   msgImg = '';
//   files: Element[] = [];
//   msgFifo= '';
//   msgPrint = '';
//   filesForm: FormGroup;
//   msgChargeFifo = '';

//   constructor(private fifoResquest: FifoRequestService) { 
//     this.filesForm = new FormGroup({
//       fifoFiles: new FormArray([
//         this.createFileFormGroup()
//       ])
//     });
//   }
  
//   createFileFormGroup(): FormGroup {
//     return new FormGroup({
//       file: new FormControl(''),
//       vars: new FormArray([
//         this.createVariableFormGroup()
//       ])
//     });
//   }
  
//   createVariableFormGroup(): FormGroup {
//     return new FormGroup({
//       name: new FormControl(''),
//       value: new FormControl('')
//     });
//   }
  
//   get fifoFiles(): FormArray {
//     return this.filesForm.get('fifoFiles') as FormArray;
//   }
  
//   addVariable(fileControl: FormGroup) {
//     const vars = fileControl.get('vars') as FormArray;
//     vars.push(this.createVariableFormGroup());
//   }
  
//   addFile() {
//     this.fifoFiles.push(this.createFileFormGroup());
//   }
  
//   getVars(fileControl: AbstractControl): FormArray {
//     return fileControl.get('vars') as FormArray;
//   }
  
//   getFileControlAsFormGroup(fileControl: AbstractControl): FormGroup {
//     return fileControl as FormGroup;
//   }

// ngOnInit(): void {
//     console.log('fifo');
//   }

//   emptyFifo():void {
//     let codeStatus: number | undefined;
//     this.fifoResquest.getEmptyFifo().subscribe({
//       next: (res) => {
//         codeStatus = res.code;
//         if (codeStatus === 200) {
//           this.msgEmptyFifo = 'Cola de fifo vaciada correctamente.';
//         } else {
//           this.msgEmptyFifo = 'No se ha podido vaciar la cola de fifo.';
//         }
//       },
//       error: (err) => {
//         console.log(err);
//         this.msgEmptyFifo = 'El sistema no está encendido.';
//       }
//     });
//   }

//   countMsgs(): void {
//     let codeStatus: number | undefined;
//     this.fifoResquest.getCountMsgFifo().subscribe({
//       next: (res) => {
//         codeStatus = res.code;
//         if (codeStatus !== 400) {
//           this.msgCount = 'La cola de fifo tiene ' + (res) + ' mensajes.';
//         } else {
//           this.msgCount = 'Cola de fifo vacía.';
//         }
//       },
//       error: (err) => {
//         console.log(err);
//         this.msgCount = 'El sistema no está modo Fifo.';
//       }
//     });
//   }

//   visualizeElement(numElement: number, color:string): void {
//     this.fifoResquest.getPrevImgColor(numElement, color).subscribe({
//       next: (res) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           this.img = reader.result as string;
//         };
//         if(res) {
//           reader.readAsDataURL(res);
//         } else {
//           this.msgImg = 'No se puede ver la imagen seleccionada.';   
//         }
//       },
//       error: (err) => {
//         this.msgImg = 'No se puede ver la imagen seleccionada.';
//       }
//     });
//   }

//   listMessages(): void {

//     this.fifoResquest.getMsgListFifo().subscribe({
//       next: (res) => {
//         if (res.length > 0) {
//           this.files = res;
//         }else {
//           this.files = [];
//           this.msgFifo = 'La lista de mensajes de fifo está vacía.';
//         }
//       },
//       error: (err) => {
//         this.msgFifo = 'El sistema está apagado o modo fifo desactivado.';
//       }
//     });
//   }

//   printNextMsg(): void {

//     let codeStatus: number | undefined;

//     this.fifoResquest.getNextMsgFifo().subscribe({
//       next:(res) => {
//         codeStatus = res.code;
//         if (codeStatus === 200) {
//           this.msgPrint = 'Siguiente mensaje enviado correctamente.';
//         } else {
//           this.msgPrint = 'No había siguiente mensaje en cola fifo.';
//         }
//       },
//       error: (err) => {
//         this.msgPrint = 'El sistema está apagado o modo fifo desactivado.';
//       }
//   });
// }

  // chargeMsgFifo(): void {
  //   let codeStatus: number = 0;

  //   const fifoFiles: List[] = this.fifoFiles.controls.map((group: AbstractControl) => {
  //     const formGroup = group as FormGroup;
  //     const vars: Variable[] = (formGroup.get('vars') as FormArray).controls.map((varGroup: AbstractControl) => {
  //       const varFormGroup = varGroup as FormGroup;
  //       return {
  //         name: varFormGroup.get('name')?.value,
  //         value: varFormGroup.get('value')?.value 
  //       };
  //     });
  //     return {
  //       file: formGroup.get('file')?.value,
  //       vars: vars,
  //     };
  //   });
  
  //   this.fifoResquest.putChargeFifo(fifoFiles).subscribe({
  //     next: (res) => {
  //       codeStatus = res.code;
  //       if (codeStatus !== 400) {
  //         this.msgChargeFifo = 'Se ha cargado la lista de mensajes correctamente.';
  //       } else {
  //         this.msgChargeFifo = 'No se ha podido cargar la lista de mensajes.';
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this.msgChargeFifo = 'El sistema no está encendido / Modo List desactivado.';
  //     }
  //   });
  
  //   this.filesForm.reset();
  //   this.filesForm = new FormGroup({
  //     fifoFiles: new FormArray([
  //       this.createFileFormGroup()
  //     ])
  //   });
  // }

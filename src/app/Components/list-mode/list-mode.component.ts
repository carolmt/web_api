import { Component, OnInit } from '@angular/core';
import { ListRequestService } from '../../Services/ListRequest/list-request.service';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Element, Var } from '../../Interfaces/fifo.interface';
import { List, Variable } from '../../Interfaces/variablesValues.interface';

@Component({
  selector: 'app-list-mode',
  standalone: true,
  imports: [FormsModule , CommonModule, ReactiveFormsModule],
  templateUrl: './list-mode.component.html',
  styleUrl: './list-mode.component.css'
})
export class ListModeComponent implements OnInit{

  URL_BASE = 'http://localhost:8080/api';
  msgEmptyList = '';
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
  msgCount = '';
  files: Element[] = [];
  msgList = '';
  msgPrint = '';
  msgNum: number = 0;
  filesForm: FormGroup;
  msgChargeList = '';

  constructor(private listRequest: ListRequestService) { 
    this.filesForm = new FormGroup({
      listFiles: new FormArray([
        this.createFileFormGroup()
      ])
    });
  }
  
  createFileFormGroup(): FormGroup {
    return new FormGroup({
      file: new FormControl(''),
      vars: new FormArray([
        this.createVariableFormGroup()
      ])
    });
  }
  
  createVariableFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      value: new FormControl('')
    });
  }
  
  get listFiles(): FormArray {
    return this.filesForm.get('listFiles') as FormArray;
  }
  
  addVariable(fileControl: FormGroup) {
    const vars = fileControl.get('vars') as FormArray;
    vars.push(this.createVariableFormGroup());
  }
  
  addFile() {
    this.listFiles.push(this.createFileFormGroup());
  }
  
  getVars(fileControl: AbstractControl): FormArray {
    return fileControl.get('vars') as FormArray;
  }
  
  getFileControlAsFormGroup(fileControl: AbstractControl): FormGroup {
    return fileControl as FormGroup;
  }


  ngOnInit(): void {
    console.log('list');
  }

  emptyList():void {
    this.listRequest.getEmptyList().subscribe({
      next: (res) => {
          this.msgEmptyList = 'Lista vaciada correctamente.';
      },
      error: (err) => {
        console.log(err);
        this.msgEmptyList ='El sistema no está encendido / Modo List desactivado.';
      }
    });
  }

  visualizeElement(numElement: number, color:string): void {

    let codeStatus: number | undefined;

    this.listRequest.getPrevImgColor(numElement, color).subscribe({
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
        this.msgImg = 'El sistema no está encendido / Modo List desactivado.';
      }
    });
  }

  countMsgList(): void  {
    let codeStatus: number | undefined;
    this.listRequest.getCountMsgList().subscribe({
      next: (res) => {
        codeStatus = res.code;
        if (codeStatus !== 400) {
          this.msgCount = 'La lista tiene ' + (res) + ' mensajes.';
        } else {
          this.msgCount = 'Lista vacía.';
        }
      },
      error: (err) => {
        console.log(err);
        this.msgCount = 'El sistema no está encendido / Modo List desactivado.';
      }
    });
  }

  listMessages(): void {

    this.listRequest.getMsgList().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.files = res;
        }else {
          this.files = [];
          this.msgList = 'La lista de mensajes está vacía.';
        }
      },
      error: (err) => {
        this.msgList = 'El sistema no está encendido / Modo List desactivado.';
      }
    });
  }

  printSelected(num: number): void {
    let codeStatus: number | undefined;
    this.listRequest.getPrintSelected(num).subscribe({
      next: (res) => {
        codeStatus = res.code;
        if (codeStatus !== 400) {
          this.msgPrint = 'Se ha mandado a imprimir el mensaje seleccionado.';
        } else {
          this.msgPrint = 'No existe el mensaje seleccionado.';
        }
      },
      error: (err) => {
        console.log(err);
        this.msgPrint = 'El sistema no está encendido / Modo List desactivado.';
      }
    });
  }

  chargeMsgList(): void {
    let codeStatus: number = 0;

    const listFiles: List[] = this.listFiles.controls.map((group: AbstractControl) => {
      const formGroup = group as FormGroup;
      const vars: Variable[] = (formGroup.get('vars') as FormArray).controls.map((varGroup: AbstractControl) => {
        const varFormGroup = varGroup as FormGroup;
        return {
          name: varFormGroup.get('name')?.value,
          value: varFormGroup.get('value')?.value 
        };
      });
      return {
        file: formGroup.get('file')?.value,
        vars: vars,
      };
    });
  
    this.listRequest.putChargeList(listFiles).subscribe({
      next: (res) => {
        codeStatus = res.code;
        if (codeStatus !== 400) {
          this.msgChargeList = 'Se ha cargado la lista de mensajes correctamente.';
        } else {
          this.msgChargeList = 'No se ha podido cargar la lista de mensajes.';
        }
      },
      error: (err) => {
        console.log(err);
        this.msgChargeList = 'El sistema no está encendido / Modo List desactivado.';
      }
    });
  
    this.filesForm.reset();
    this.filesForm = new FormGroup({
      listFiles: new FormArray([
        this.createFileFormGroup()
      ])
    });
  }
}

import { Component, OnInit, ChangeDetectorRef, COMPILER_OPTIONS  } from '@angular/core';
import { RequestService } from '../../Services/Request/request.service';
import { ChargeFile, Variable } from '../../Interfaces/variablesValues.interface';
import { Messages } from '../../Interfaces/listMessages.interface';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PLC, PlC2, PLC3, PLCList } from '../../Interfaces/plcList.interface';
import { Listimg } from '../../Interfaces/listImg.interface';
import { PostProps, Propierty } from '../../Interfaces/post.interface';
import { CommonModule } from '@angular/common';
import SpinnerComponent from '../spinner/spinner.component';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SpinnerComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  ngOnInit(): void {
    console.log('hola');
  }
  /*URL_BASE='http://localhost:8080/api';

  messageStatus = '';
  messageStop = '';
  codeStatus: number | undefined;
  img: string | undefined;
  img2: string | undefined;
  messageImg = '';
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
  dataVariable: Variable[] = [];
  mssgError= '';
  mssgVariable = '';
  listMsg: Messages[] = [];
  show = false;
  fileToDelete = '';  
  file = '';
  infoFile = '';
  mssgeDelete = '';
  mssgDownload = '';
  plcNum: number = 0;
  plcOk: PLC[] = [];
  plcNoOk: PlC2[] = [];
  mssgPlc = '';
  fileToVisualize = '';
  ListOfImg: Listimg[] = [];
  msgList = '';
  form: FormGroup | undefined;
  nameValue = '';
  value= '';
  properties: Propierty[] = [];
  variableForm: FormGroup;
  varsForm: FormGroup;
  msgEdit = '';
  plcRegistersForm: FormGroup;
  widthForm: FormGroup;
  propsForm: FormGroup;
  userWidth: number = 0;
  msgWidth = '';
  optionStates: Map<string, boolean> = new Map<string, boolean>();


  constructor(private requestService: RequestService, private cdr: ChangeDetectorRef){
    this.variableForm = new FormGroup({
      file: new FormControl(''),
      copies: new FormControl(''),
      name: new FormControl(''),
      value: new FormControl(''),
      vars: new FormArray([
        this.varsForm = new FormGroup({
          name: new FormControl(''),
          value: new FormControl(''),
        })
      ])
    });

    this.plcRegistersForm = new FormGroup({
      listPlcs: new FormArray([
        this.createRegisterFormGroup()
      ])
    });

    this.widthForm = new FormGroup({
      refresh: new FormControl(true),
      props: new FormArray([
        this.propsForm = new FormGroup({
          name: new FormControl('width'),
          values: new FormControl(''),
        })
      ])
    });
    }

    createRegisterFormGroup(): FormGroup {
      return new FormGroup({
        reg: new FormControl(''),
        values: new FormArray([
          this.createValuesFormGroup()
        ])
      });
    }

    createValuesFormGroup(): FormGroup {
      return new FormGroup({
        newValue: new FormControl('')
      });
    }

    get vars() {
      return this.variableForm.get('vars') as FormArray;
    }

    get listPlcs(): FormArray {
      return this.plcRegistersForm.get('listPlcs') as FormArray;
    }

    addRegister() {
      this.listPlcs.push(this.createRegisterFormGroup());
    }

    addValue(plcControl: FormGroup) {
      const values = plcControl.get('values') as FormArray;
      values.push(this.createValuesFormGroup());
    }

    addVariable() {
      this.vars.push(new FormGroup({
        name: new FormControl(''),
        value: new FormControl(''),
      }));
    }

    getValues(plcControl: AbstractControl): FormArray {
      return plcControl.get('values') as FormArray;
    }

    getPlcControlAsFormGroup(plcControl: AbstractControl): FormGroup {
      return plcControl as FormGroup;
    }

    //metodo para mostrar u ocultar los mensajes, sin usar 30 variables booleanas.
    alternarOpcion(optionId: string) {
      const currentState = this.optionStates.get(optionId) || false;
      this.optionStates.set(optionId, !currentState);

      switch (optionId) {
      case 'status':
        this.getStatus();
        break;
      case 'stop':
        this.stopPrinting();
        break;
      case 'variables':
        this.variablesAndValues();
        break;
      case 'messages':
        this.listMessages();
        break;
      case 'delete':
        this.deleteMsg();
        break;
      case 'visualize':
        this.visualizeImgFromCtrl();
        break;
      case 'list':
        this.listImgFromCtrl();
        break;
      case 'listImg':
        this.listImgFromCtrl();
        break;
      case 'plc':
        this.logsFromPlc();
        break;
      default:
        break;
    }
    }


  ngOnInit(): void {
    console.log('hola');
  }


  getStatus() {

    this.requestService.getPrinterStatus().subscribe ({
      next: (res) => {
          this.codeStatus = res.code;
          if (this.codeStatus == 200) {
            this.messageStatus = 'El programa está funcionando correctamente';
            console.log(this.messageStatus);
          }else {
            this.messageStatus = 'El programa no está funcionando correctamente';
            console.log(this.messageStatus);
          }
      },
      error: (err)=> {
        this.messageStatus = 'La impresora está apagada.';
        console.log(err);
        
      }
    })
  
  }

  stopPrinting() {
    this.requestService.getStopPrinting().subscribe({
      next: (res) => {
        this.codeStatus = res.code;
        if (this.codeStatus === 200) {
          this.messageStop = 'Se ha parado la impresión correctamente.';
        }else {
          this.messageStop = 'No se ha podido parar la impresión.';
        }
      },
      error: (err) => {
        this.messageStop = 'No se ha podido parar la impresión.';
      }
    })
  }

  visualizeImg(color: string) {
    this.requestService.getImgFromCurrentMessage(color).subscribe({
      next: (res) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.img = reader.result as string;
        };
        if (res) {
          reader.readAsDataURL(res);
        }
      },
      error: (err) => {
        this.messageImg = 'Sistema apagado.';
        console.log(err);
      }
    })
  }

  variablesAndValues() {
      this.requestService.getVariablesAndValues().subscribe({
        next: (res) => {
          this.codeStatus = res.code;
          if(this.codeStatus === 400) {
            this.mssgVariable = 'No se ha detectado mensaje cargado.';
          }
          else if (this.codeStatus !== 400) {
            this.dataVariable = res;
          }else if (res.name = isEmpty()) {
            this.mssgVariable = 'El mensaje cargado no contiene variables.'
          }
               this.cdr.detectChanges();  
      },
        error: (err) => {
          console.log(err);
          this.mssgVariable = 'El sistema no está encendido.';
        }
      })
  }

  listMessages() {
    this.requestService.getControllerMessages().subscribe({
      next: (res) => {
        this.codeStatus = res.code;
        if (this.codeStatus != 400) {
          this.listMsg = res;
        }else{
          this.mssgError = 'No se han detectado mensajes en el controlador.';
        }
        this.cdr.detectChanges();
        this.show = true;
      },
      error: (err) => {
        console.log(err);
        this.mssgError = 'El sistema no está encendido.';
        this.show = true;
      }
    })
}

deleteMsg() { 
  if (this.fileToDelete.trim() === '') {
    this.mssgeDelete = 'Por favor ingresa un nombre de archivo válido.';
    return;
  }
  this.requestService.getDeleteMsg(this.fileToDelete).subscribe({
    next: (res) => {
      this.codeStatus = res.code;
      if (this.codeStatus === 200) {
        this.mssgeDelete = 'Mensaje eliminado correctamente.';
      }else {
        this.mssgeDelete = 'No se ha podido eliminar el mensaje.';
      }
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.log(err);
      this.mssgeDelete = 'El sistema no está encendido.';
    }
  });
}

//no va bien
logsFromPlc() {
  this.requestService.getPlcLogs(this.plcNum).subscribe({
    next: (res) => {
      this.codeStatus = res.code;
      if (this.codeStatus ===200) {
        this.plcOk = res;
        this.plcNoOk = res;
      }else {
        this.mssgPlc = 'No se han detectado mensajes.';
      }
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.log(err);
      this.mssgPlc = 'El sistema no está encendido.';
    }
  });

}

visualizeImgFromCtrl() {
  this.requestService.getImgFromCtrl(this.fileToVisualize).subscribe({
    next: (res) => {
      if(this.fileToVisualize.trim() === '') {
        this.messageImg = 'Por favor, introduce un nombre de archivo válido.';
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        this.messageImg = '';
        this.img2 = reader.result as string;
      };
      if (res) {
        reader.readAsDataURL(res);
      }
    },
    error: (err) => {
      this.messageImg = 'Sistema apagado.';
      console.log(err);
    }
  });
}

listImgFromCtrl() {
  this.requestService.getListOfImg().subscribe({
    next: (res) => {
      this.codeStatus = res.code;
      if (this.codeStatus !== 400) {
        this.ListOfImg = res;
      }else {
        this.msgList = 'No se han detectado imágenes.';
      }
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.log(err);
      this.msgList = 'El sistema no está encendido.';
    }
  });
}

//metodos PUT

changeWidthCurrentMsg(): void {
  let codeStatus = '';
  const widthVariable: PostProps = ({
    refresh: true,
    props: [{
      name: 'width',
      value: this.userWidth.toString()
    }]
  });

  this.requestService.putUpdatePropierties(widthVariable).subscribe({
    next: (res) => {
        this.msgWidth = 'Ancho de mensaje cambiado correctamente.';
    },
  error: (err) => {
    console.log(err);   
      this.msgWidth = 'El sistema está apagado.';
  }
  });
  this.variableForm.reset();
}

  editCurrentVariable(): void {
    let codeStatus: number;
    const variables: Variable[] = [{
      name: this.variableForm.get('name')?.value,
      value: this.variableForm.get('value')?.value
    }];
    this.requestService.putUpdateCurrentVariables(variables).subscribe({
      next: (res) => {
        codeStatus = res.code;
        if(codeStatus === 200) {
          this.msgEdit = 'Variable editada correctamente.';
      }else {
        this.msgEdit = 'No se ha podido editar la variable.';
      }
    },
    error: (err) => {
      console.log(err);
      this.msgEdit = 'El sistema no está encendido.';
    }
    });
    this.variableForm.reset();
  }

  chargeNewMsgNewVariables():void {
    let codeStatus: number;
    const vars: Variable[] = this.vars.controls.map((group: AbstractControl) => {
      const formGroup = group as FormGroup;
      return {
        name: formGroup.get('name')?.value,
        value: formGroup.get('value')?.value 
      };
    });

    const msgWithVariables: ChargeFile = {
      file: this.variableForm.get('file')?.value,
      copies: this.variableForm.get('copies')?.value,
       vars: vars,
    };
    this.requestService.putNewMsgAndVariables(msgWithVariables).subscribe({

    });
    this.variableForm.reset();
  }

  writeValuesListInPlcRegisters(): void {
    let codeStatus: number = 0;

    const listPlcs: PLC3[] = this.listPlcs.controls.map((group: AbstractControl) => {
      const formGroup = group as FormGroup;
      const values: number[] = (formGroup.get('values') as FormArray).controls.map((valGroup: AbstractControl) => {
        const valFormGroup = valGroup as FormGroup;
        return valFormGroup.get('newValue')?.value; 
      });
      return {
        reg: formGroup.get('reg')?.value,
        values: values,
      };
    });
    console.log(listPlcs);
    this.requestService.putListOfValuesPlc(listPlcs).subscribe({
      next: (res) => {
        codeStatus = res.code;
        if (codeStatus !== 400) {
          this.mssgPlc = 'Se han escrito los valores en los registros PLC correctamente.';
        }else {
          this.mssgPlc = 'No se han podido escribir los valores en los registros PLC.';
        }
      },
      error: (err) => {
        console.log(err);
        this.mssgPlc = 'El sistema no está encendido.';
      }
    });

    this.plcRegistersForm.reset();
    this.plcRegistersForm = new FormGroup({
      listPlcs: new FormArray([
        this.createRegisterFormGroup()
      ])
    });
  }*/
}
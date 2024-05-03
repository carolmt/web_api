import { Component, OnInit, ChangeDetectorRef, COMPILER_OPTIONS  } from '@angular/core';
import { RequestService } from '../../Services/Request/request.service';
import { ChargeFile, Variable } from '../../Interfaces/variablesValues.interface';
import { Messages } from '../../Interfaces/listMessages.interface';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PLC, PlC2, PLC3, PLCList } from '../../Interfaces/plcList.interface';
import { Listimg } from '../../Interfaces/listImg.interface';
import { Propierty } from '../../Interfaces/post.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-general-mode',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './general-mode.component.html',
  styleUrl: './general-mode.component.css'
})
export class GeneralModeComponent implements OnInit{

  URL_BASE='http://localhost:8080/api';

  messageStatus: string | undefined;
  messageStop: string | undefined;
  codeStatus: number | undefined;
  img: string | undefined;
  img2: string | undefined;
  messageImg: string | undefined;
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
  plcNum = '';
  plcOk: PLC[] = [];
  plcNoOk: PlC2[] = [];
  mssgPlc = '';
  fileToVisualize = '';
  ListOfImg: Listimg[] = [];
  msgList = '';
  form: FormGroup | undefined;
  nameValue = '';
  value= '';
  refresh= false;
  properties: Propierty[] = [];
  variableForm: FormGroup;
  varsForm: FormGroup;
  msgEdit = '';
  plcRegistersForm: FormGroup;

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
            this.messageStatus = 'El programa no está iniciado';
            console.log(this.messageStatus);
          }
      },
      error: (err)=> {
        this.messageStatus = 'Error en el programa';
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
    if(this.show == false){
      this.requestService.getVariablesAndValues().subscribe({
        next: (res) => {
          this.codeStatus = res.code;
          if (this.codeStatus !=400) {
            this.dataVariable = res;
          }else if (res == 's') {
            this.mssgVariable = 'Este mensaje no contiene variables';
          }
          else{
            this.mssgVariable = 'No se ha detectado mensaje cargado.';
          }
               this.cdr.detectChanges();  
      },
        error: (err) => {
          console.log(err);
          this.mssgVariable = 'El sistema no está encendido.';
        }
      })
      this.show = true;
    }else {
      this.show = false;
    }
    
  }

  listMessages() {
    if(this.show == false){
    this.requestService.getControllerMessages().subscribe({
      next: (res) => {
        this.codeStatus = res.code;
        if (this.codeStatus != 400) {
          this.listMsg = res;
        }else{
          this.mssgError = 'No se ha detectado mensaje cargado.';
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
  }else {
    this.show = false;
  }
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
      const reader = new FileReader();
      reader.onloadend = () => {
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
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Empleado } from '../../Interfaces/baseDatos.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private empleadoSubject = new BehaviorSubject<Empleado | null>(null);
  empleado$ = this.empleadoSubject.asObservable();

  constructor() { }

  login(empleado: Empleado): void {
    this.isLoggedInSubject.next(true);
    this.empleadoSubject.next(empleado);
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.empleadoSubject.next(null);
  }
}

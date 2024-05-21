import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderIdSource = new BehaviorSubject<number | null>(null);
  orderId$ = this.orderIdSource.asObservable();

  setOrderId(orderId: number): void {
    this.orderIdSource.next(orderId);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private showModalSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public showModal$ = this.showModalSubject.asObservable();

  public inputValue: string = '';

  constructor() {}

  openModal() {
    this.showModalSubject.next(true);
  }

  closeModal() {
    this.showModalSubject.next(false);
  }
}

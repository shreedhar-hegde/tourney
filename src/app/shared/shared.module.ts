import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification.service';

@NgModule({
  declarations: [ModalComponent, NotificationComponent],
  providers: [ModalService, NotificationService],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ModalComponent, NotificationComponent],
})
export class SharedModule {}

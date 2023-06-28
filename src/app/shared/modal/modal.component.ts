import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DateTime } from 'luxon';
import { ProfileService } from 'src/app/services/profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  showModal: boolean = false;
  profileSrc: String | ArrayBuffer = '';
  formData = new FormData();
  dob: any;
  updatedProfilePic: any;

  constructor(
    public modalService: ModalService,
    private profileService: ProfileService,
    private sanitizer: DomSanitizer,
    private notificationService: NotificationService
  ) {}
  profileForm = new FormGroup({
    dateOfBirth: new FormControl(''),
    place: new FormControl(''),
  });

  ngOnInit(): void {
    this.modalService.showModal$.subscribe((showModal) => {
      this.showModal = showModal;
    });

    this.profileService.getProfile().subscribe((res: any) => {
      this.dob = DateTime.fromISO(res.profile.dob);
      this.profileForm.controls['dateOfBirth'].setValue(this.currentDate());
      this.profileForm.controls['place'].setValue(res.profile.place);
      this.updatedProfilePic = this.getImageDataUrl(res.profilePic.data);
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

  updateModal() {
    this.modalService.closeModal();
  }

  currentDate() {
    const currentDate = new Date(this.dob);
    return currentDate.toISOString().substring(0, 10);
  }

  getImageDataUrl(buffer: any) {
    const uint8Array = new Uint8Array(buffer);
    const blob = new Blob([uint8Array], { type: 'image/png' });
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
  }

  updateProfile(event: any) {
    event.preventDefault();

    this.formData.append(
      'dateOfBirth',
      new Date(this.profileForm.value.dateOfBirth).toISOString()
    );
    this.formData.append('place', this.profileForm.value.place);

    this.profileService.updateProfile(this.formData).subscribe((res: any) => {
      console.log('res', res);
      this.notificationService.success('Success', 'Profile Updated', 5000);

      this.updatedProfilePic = this.getImageDataUrl(res.profilePic.data);

      this.dob = DateTime.fromISO(res.updatedUser.dob);
      this.profileForm.controls['dateOfBirth'].setValue(this.currentDate());
      this.profileForm.controls['place'].setValue(res.updatedUser.place);
    });
  }

  onImageChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.updatedProfilePic = reader.result!);
      reader.readAsDataURL(file);

      this.formData.append('profilePicture', file);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { DateTime } from 'luxon';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalService } from '../shared/modal.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  showModal = false;

  dob: any;
  place!: string;
  username!: string;

  constructor(
    private profileService: ProfileService,
    private sanitizer: DomSanitizer,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {}
  type: any;
  updatedProfilePic: any;

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((res: any) => {
      this.dob = DateTime.fromISO(res.profile.dob);
      this.username = res.profile.username;
      this.place = res.profile.place;
      this.updatedProfilePic = this.getImageDataUrl(res.profilePic.data);
    });
  }

  getImageDataUrl(buffer: any) {
    const uint8Array = new Uint8Array(buffer);
    const blob = new Blob([uint8Array], { type: 'image/png' });
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
  }

  openModal() {
    this.modalService.openModal();
  }
}

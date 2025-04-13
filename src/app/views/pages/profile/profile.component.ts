import { Component, inject, OnInit } from '@angular/core';
import { SuppliersService } from '../../../core/services/suppliers.service';
import { Supplier } from '../../../core/model/supplier';
import { ImageUploaderComponent } from "./image-uploader/image-uploader.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ImageUploaderComponent,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {


  ngOnInit(): void {
    this.getSuppliersData();
  }
  supplierService = inject(SuppliersService);
  supplier: Supplier | null = null;
  startEditProfile: boolean = false;

  getSuppliersData() {
    this.supplierService.getSupplierDataById('23').subscribe((data) => {
      if (data.length > 0) {
        this.supplier = data[0];
        if (this.supplier.photo === null) {
          this.supplier.photo = 'images/faces/face1.jpg';
        }
      } else {
        this.supplier = null;
      }
    });
  }
  editProfile() {
    this.startEditProfile = true;
  }
  discardChanges() {
    this.startEditProfile = false;
    }
    saveProfileChanges() {
      this.startEditProfile = false;
    }
}

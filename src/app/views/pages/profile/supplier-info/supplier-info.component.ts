import { Component, input } from '@angular/core';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
import { FormsModule } from '@angular/forms';
import { Supplier } from '../../../../core/model/supplier';

@Component({
  selector: 'app-supplier-info',
  standalone: true,
  imports: [ImageUploaderComponent,FormsModule],
  templateUrl: './supplier-info.component.html',
  styleUrl: './supplier-info.component.scss'
})
export class SupplierInfoComponent {
  startEditProfile: boolean = false;
  supplier= input.required< Supplier| null>();
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

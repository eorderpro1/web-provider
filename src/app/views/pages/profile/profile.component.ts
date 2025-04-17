import { Component, inject, OnInit } from '@angular/core';
import { SuppliersService } from '../../../core/services/suppliers.service';
import { Supplier } from '../../../core/model/supplier';
import { FormsModule } from '@angular/forms';
import { PostalCodesSettingsComponent } from "./postal-codes-settings/postal-codes-settings.component";
import { SupplierInfoComponent } from "./supplier-info/supplier-info.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, PostalCodesSettingsComponent, SupplierInfoComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {


  ngOnInit(): void {
    this.getSuppliersData();
  }
  supplierService = inject(SuppliersService);
  supplier: Supplier | null = null;

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

}

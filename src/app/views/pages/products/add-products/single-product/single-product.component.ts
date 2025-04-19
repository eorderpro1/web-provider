import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ImageUploaderComponent } from "../../../common-components/image-uploader/image-uploader.component";
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../../../core/services/products.service';
import { Category } from '../../../../../core/model/category';
@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [ImageUploaderComponent,NgSelectModule, FormsModule, CommonModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent implements OnInit {

categories: string[] = [];
selectedCategory: string = '';
productService = inject(ProductsService);
measurementTypes: string[] = ['pcs/ τεμαχιο','kg/ Κιλο', 'l/λίτρα', 
  'ml', 'm/μέτρα', 'cm/ εκατοστά', 'm2/ τετραγωνικά μέτρα', 'm3/ κυβικά μέτρα', 'gr/ γραμμάρια', 'pack/ πακέτο', 'box/ κουτί', 'pallet/ παλέτα', 'roll/ ρολό', 'set/ σετ', 'bottle/ φιάλη'];
selectedMeasurementType: string = '';
destroy = inject(DestroyRef);
ngOnInit(): void {
  this.fetchCategories();
}
public fetchCategories()
{
  let sub = this.productService.getAllCategories().subscribe((data) => {
    data.forEach((category: Category) => {
      this.categories = data.map((category: Category) => category.category);
    });
  
  });
  this.destroy.onDestroy(() => sub.unsubscribe());
}


}

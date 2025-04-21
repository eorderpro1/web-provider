import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Category } from '../../../../../core/model/category';
import { ProductsService } from '../../../../../core/services/products.service';
import { CreateProductByCategory } from '../../../../../core/model/create-product-by-category';
import { ImageUploaderComponent } from "../../../common-components/image-uploader/image-uploader.component";

@Component({
  selector: 'app-category-with-products',
  standalone: true,
  imports: [NgSelectComponent, FormsModule, ImageUploaderComponent],
  templateUrl: './category-with-products.component.html',
  styleUrl: './category-with-products.component.scss'
})
export class CategoryWithProductsComponent {

categories: string[] = [];
selectedCategory: string ;
productService = inject(ProductsService);
destroy = inject(DestroyRef);
measurementTypes: string[] = ['pcs/ τεμαχιο','kg/ Κιλο', 'l/λίτρα', 
  'ml', 'm/μέτρα', 'cm/ εκατοστά', 'm2/ τετραγωνικά μέτρα', 'm3/ κυβικά μέτρα', 'gr/ γραμμάρια', 'pack/ πακέτο', 'box/ κουτί', 'pallet/ παλέτα', 'roll/ ρολό', 'set/ σετ', 'bottle/ φιάλη'];

 products: CreateProductByCategory[] = [this.createEmptyProductBlock()];
selectedMeasurementType: any;
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



    createEmptyProductBlock(): CreateProductByCategory {
      let category: Category = { category: '' } as Category;
      let id = this.products !==undefined  ? this.products[this.products.length - 1].id + 1 : 0;
      return {
      id: id,
      category: category,
      erpId: '',
      productName: '',
      productPrice: '',
      supplier: '',
      quantity: 0,
      measurementType: null,
};
    }
  
    addProductBlock() {
      this.products.push(this.createEmptyProductBlock());
    }
  
    removeProductBlock(index: number) {
      this.products.splice(index, 1);
    }
    submitCategoryWithProducts() {
      throw new Error('Method not implemented.');
      }
  
}

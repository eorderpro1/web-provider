import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../../../core/services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-postal-code',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './products-postal-code.component.html',
  styleUrl: './products-postal-code.component.scss'
})
export class ProductsPostalCodeComponent implements OnInit {
savePrice() {
throw new Error('Method not implemented.');
}

    productId = input.required<string>();
    supplier = input.required<string>();
    private productService = inject(ProductsService);
    products: any[] = [];
    page: number = 1;
    limit: number = 20;
    totalPages = signal<number>(2);
    totalElements = signal<number>(2);
    private destroy = inject(DestroyRef);

    ngOnInit(): void {
      let data = { supplierId: this.supplier(), productId: this.productId()!, page: this.page, limit: this.limit };
      let sub = this.productService.getSuppliersProductsPerPostalCode(this.sort, data).subscribe((data) => {
        this.products = data.content;
        this.totalElements.set(data.totalElements);
        this.totalPages.set(Math.ceil(this.totalElements() / this.limit));
  
      });
      this.destroy.onDestroy(() => sub.unsubscribe());
    }
  sort(sort: any, data: { supplierId: string; categoryId: import("@angular/core").InputSignal<string>; page: number; limit: number; }) {
    throw new Error('Method not implemented.');
  }
    

}

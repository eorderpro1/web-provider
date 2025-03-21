import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../../../core/services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SortableHeaderComponent } from '../../../../sortable-header/sortable-header.component';

@Component({
  selector: 'app-products-postal-code',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbPagination, SortableHeaderComponent],
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
    products= signal<any[]>([]);
    page: number = 1;
    limit: number = 10;
    totalPages = signal<number>(2);
    totalElements = signal<number>(2);
    private destroy = inject(DestroyRef);
    sort: any = { field: ''};

    ngOnInit(): void {
      this.fetchPostalCodesDetailed('');
    }
  public fetchPostalCodesDetailed(postalCode:string) {
    let data = { postalC:postalCode ,supplierId: this.supplier(), productId: this.productId()!, page: this.page, limit: this.limit };
    let sub = this.productService.getSuppliersProductsPerPostalCode(this.sort, data).subscribe((data) => {
      console.log(data.content)
      this.products.set(data.content);
      this.totalElements.set(data.totalElements);
      this.totalPages.set(Math.ceil(this.totalElements() / this.limit));

    });
    this.destroy.onDestroy(() => sub.unsubscribe());
  }
  searchByPostalCode(value: string): void {
    this.fetchPostalCodesDetailed(value);
    this.page = 1;

  }
  sortData(field: string): void {
    if (this.sort.field === field) {
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.field = field;
      this.sort.order = 'asc';
    }
    this.fetchPostalCodesDetailed('')
  }

}

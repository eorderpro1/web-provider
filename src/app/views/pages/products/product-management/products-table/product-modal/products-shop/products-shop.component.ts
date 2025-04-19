import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../../../../core/services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SortableHeaderComponent } from '../../../../../sortable-header/sortable-header.component';

@Component({
  selector: 'app-products-shop',
  standalone: true,
  imports: [FormsModule, CommonModule, NgbPagination, SortableHeaderComponent],
  templateUrl: './products-shop.component.html',
  styleUrl: './products-shop.component.scss'
})
export class ProductsShopComponent implements OnInit {

  productId = input.required<string>();
  supplier = input.required<string>();
  private productService = inject(ProductsService);
  products: any[] = [];
  page: number = 1;
  limit: number = 10;
  totalPages = signal<number>(2);
  totalElements = signal<number>(2);
  private destroy = inject(DestroyRef);
  sort: any = { field: ''};

  ngOnInit(): void {
    this.fetchShopDetailed('')

  }
  searchByShopName(value: string) {
    this.fetchShopDetailed(value);
    this.page = 1;
  }

  savePrice() {
    throw new Error('Method not implemented.');
  }
  public fetchShopDetailed(shopName: string) {
    let data = { shop: shopName, supplierId: this.supplier(), productId: this.productId()!, page: this.page, limit: this.limit };
    let sub = this.productService.getSuppliersProductsPerShop(this.sort, data).subscribe((data) => {
      this.products = data.content;
      this.totalElements.set(data.totalElements);
      this.totalPages.set(Math.ceil(this.totalElements() / this.limit));

    });
    this.destroy.onDestroy(() => sub.unsubscribe());
  }
  sortData(field: string): void {
    if (this.sort.field === field) {
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.field = field;
      this.sort.order = 'asc';
    }
    this.fetchShopDetailed('')
  }
}
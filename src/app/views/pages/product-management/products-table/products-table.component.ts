import { Component, DestroyRef, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupplierCategory } from '../../../../core/model/suppliers-category';
import { SortableHeaderComponent } from '../../sortable-header/sortable-header.component';
import { ProductsService } from '../../../../core/services/products.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [SortableHeaderComponent, NgbPaginationModule,FormsModule],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss'
})
export class ProductsTableComponent implements OnInit {

  categoryId: string | null = null;
  sort: any = { field: '', order: '' };
  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  products: any[] = [];
  page: number = 1;
  limit: number = 20;
  totalPages = signal<number>(2);
  totalElements = signal<number>(2);
  private destroy = inject(DestroyRef);
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['category'] || null;
      this.updateProducts();
    });
  }

  updateProducts() {
    let data = { supplierId: '23', categoryId: this.categoryId!, page: this.page, limit: this.limit };
    let sub= this.productService.getProductsBySupplier(this.sort, data).subscribe((data) => {
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
    this.updateProducts();
  }
}

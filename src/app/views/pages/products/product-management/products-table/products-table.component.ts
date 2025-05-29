import { Component, DestroyRef, inject, OnChanges, OnInit, signal, SimpleChanges, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortableHeaderComponent } from '../../../sortable-header/sortable-header.component';
import { ProductsService } from '../../../../../core/services/products.service';
import { NgbAccordionModule, NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductModalComponent } from "./product-modal/product-modal.component";
import { ImageUploaderComponent } from "../../../common-components/image-uploader/image-uploader.component";

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [SortableHeaderComponent,NgbAccordionModule, NgbPaginationModule, FormsModule, CommonModule, ProductModalComponent, ImageUploaderComponent],
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
  editingProductId: number | null = null;
  sellingPrice: number | null = null;
  private readonly modalService = inject(NgbModal);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['category'] || null;
      this.updateProducts();
    });
  }

  updateProducts() {
    let data = { supplierId: '23', categoryId: this.categoryId!, page: this.page, limit: this.limit };
    let sub = this.productService.getProductsBySupplier(this.sort, data).subscribe((data) => {
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
  startEdit(productId: any, price: any) {
    this.editingProductId = productId
    this.sellingPrice = price;
    console.log("price "+price)
  }
  saveEdit() {
    this.editingProductId = null;
  }
  openScrollableModal(content: TemplateRef<any>) {
    this.modalService.open(content, { scrollable: true, size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

}


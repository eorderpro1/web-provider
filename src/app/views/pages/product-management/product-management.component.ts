import { CommonModule, NgClass } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../../core/services/products.service';
import { CategoryItemComponent } from "./category-item/category-item.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    RouterOutlet,
    NgbCollapseModule,
    CategoryItemComponent,
    NgbPagination,
    FormsModule
  ],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent implements OnInit {

  private productService = inject(ProductsService);
  categories: any[] = [];
  page: number = 1;
  limit: number = 10;
  totalPages = signal<number>(1);
  totalElements = signal<number>(2);
  private destroy = inject(DestroyRef);
  ngOnInit(): void {
    this.fetchCategoriesBySuplierId('');
  }

  public isAsideNavCollapsed = false;
  public fetchCategoriesBySuplierId(category: string) {
    let data= { category: category==null?'':category, supplierId: '23', page: this.page, limit: this.limit };
    let sub = this.productService.getCategoriesBySupplier(data).subscribe((data) => {
      console.log(data.content)
      this.categories = data.content;
      this.totalElements.set(data.totalElements);
      this.totalPages.set(Math.ceil(this.totalElements() / this.limit));
    });
    this.destroy.onDestroy(() => sub.unsubscribe());
  }

  searchByCategory(value: string) {
    this.fetchCategoriesBySuplierId(value)
  }
}

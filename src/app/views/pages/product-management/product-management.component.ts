import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../../core/services/products.service';
import { CategoryItemComponent } from "./category-item/category-item.component";

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    RouterOutlet,
    NgbCollapseModule,
    CategoryItemComponent
],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent implements OnInit{
  private productService = inject(ProductsService);
  categories: any[] = [];
  ngOnInit(): void {
    this.productService.getCategoriesBySupplier('23').subscribe((data) => {
      this.categories = data;
    });
  }
  
  public isAsideNavCollapsed = false;

}

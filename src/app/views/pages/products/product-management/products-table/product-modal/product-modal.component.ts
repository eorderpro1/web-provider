import { Component, input, signal } from '@angular/core';
import { ProductsPostalCodeComponent } from "./products-postal-code/products-postal-code.component";
import { ProductsShopComponent } from "./products-shop/products-shop.component";

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [ProductsPostalCodeComponent, ProductsShopComponent],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent {
   productId = input.required<string>();
   supplier = input.required<string>();


activeTab: any;

}

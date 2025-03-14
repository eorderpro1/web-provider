import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SupplierCategory } from '../model/suppliers-category';
import { SuppliersProduct } from '../model/suppliers-products';
import { PaginatedSuppliersProduct } from '../model/paginated-suppliers-product';
import { PaginatedSupplierProductShop } from '../model/supplier-product-shop';
import { PaginatedSupplierProductPostalCode } from '../model/supplier-product-postal-code';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }
  private supabaseService = inject(SupabaseService);
  getCategoriesBySupplier(supplierId: string): Observable<SupplierCategory[]> {
    return this.supabaseService.getRequest('get_suppliers_category', new HttpParams().set('supplier_id', 'eq.' + supplierId)).pipe(
      map((response: HttpResponse<SupplierCategory[]>) => response.body || [])
    );
  }



  getSuppliersProductsPerShop(sort: any, data: { supplierId: string, productId: string, page: number, limit: number }): Observable<PaginatedSupplierProductShop> {
    let params = this.generateParams(sort, data);
    params = params.set('product_id', 'eq.' + data.productId)
    return this.supabaseService.getRequest('suppliers_products_per_shop', this.generateParams(sort, data)).pipe(
      map((response: HttpResponse<any[]>) => {
        const contentRange = response.headers.get('Content-Range');
        const totalElements = contentRange
            ? parseInt(contentRange.split('/')[1], 10)
            : 0;
            return new PaginatedSupplierProductShop({
              content: response.body || [],
              totalElements: totalElements
            });
      })
    );
  }


  getSuppliersProductsPerPostalCode(sort: any, data: { supplierId: string, productId: string, page: number, limit: number }): Observable<PaginatedSupplierProductPostalCode> {
    let params = this.generateParams(sort, data);
    params = params.set('product_id', 'eq.' + data.productId)
    return this.supabaseService.getRequest('suppliers_products_per_postal_code', this.generateParams(sort, data)).pipe(
      map((response: HttpResponse<any[]>) => {
        const contentRange = response.headers.get('Content-Range');
        const totalElements = contentRange
            ? parseInt(contentRange.split('/')[1], 10)
            : 0;
            return new PaginatedSupplierProductPostalCode({
              content: response.body || [],
              totalElements: totalElements
            });
      })
    );
  }


  getProductsBySupplier(sort: any, data: { supplierId: string, categoryId: string, page: number, limit: number }): Observable<PaginatedSuppliersProduct> {
    let params = this.generateParams(sort, data);
    params = params.set('category_id', 'eq.' + data.categoryId)
    return this.supabaseService.getRequest('products_per_supplier',params ).pipe(
      map((response: HttpResponse<any[]>) => {
        const contentRange = response.headers.get('Content-Range');
        const totalElements = contentRange
            ? parseInt(contentRange.split('/')[1], 10)
            : 0;
            return new PaginatedSuppliersProduct({
              content: response.body || [],
              totalElements: totalElements
            });
      })
    );
  }

  generateParams(sort: any, data: { supplierId: string, page: number, limit: number }) {
    let params = new HttpParams()
      .set('offset', (data.page - 1) * data.limit)
      .set('limit', data.limit ==0?10:data.limit)
      .set('supplier_id', 'eq.' + data.supplierId);
    if (sort.field) params = params.set('order', sort.field + "." + sort.order);
    return params;
  }


}

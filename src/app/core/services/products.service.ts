import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PaginatedSupplierCategory, SupplierCategory } from '../model/suppliers-category';
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
  getCategoriesBySupplier(data: { supplierId: string, category: string, page: number, limit: number }): Observable<PaginatedSupplierCategory> {
    let params = this.generateParams({},data).set('category','like.*'+data.category+'*');
    return this.supabaseService.getRequest('get_suppliers_category', params ).pipe(
      map((response: HttpResponse<any[]>) => {
        const contentRange = response.headers.get('Content-Range');
        const totalElements = contentRange
            ? parseInt(contentRange.split('/')[1], 10)
            : 0;
            return new PaginatedSupplierCategory({
              content: response.body || [],
              totalElements: totalElements
            });
      })
    );
  }



  getSuppliersProductsPerShop(sort: any, data: { shop: string,supplierId: string, productId: string, page: number, limit: number }): Observable<PaginatedSupplierProductShop> {
    let params = this.generateParams(sort, data);
    params = params.set('product_id', 'eq.' + data.productId)
    params = params.set('shopname','like.*'+data.shop+'*')
    return this.supabaseService.getRequest('suppliers_products_per_shop', params).pipe(
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


  getSuppliersProductsPerPostalCode(sort: any, data: { postalC:string, supplierId: string, productId: string, page: number, limit: number }): Observable<PaginatedSupplierProductPostalCode> {
    let params = this.generateParams(sort, data);
    params = params.set('product_id', 'eq.' + data.productId);
    params=params.set('postal_code','like.*'+data.postalC+'*')
    return this.supabaseService.getRequest('suppliers_products_per_postal_code', params).pipe(
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

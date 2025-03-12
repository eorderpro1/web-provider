import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SupplierCategory } from '../model/suppliers-category';
import { SuppliersProduct } from '../model/suppliers-products';
import { PaginatedSuppliersProduct } from '../model/paginated-suppliers-product';

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

  getProductsBySupplier(sort: any, data: { supplierId: string, categoryId: string, page: number, limit: number }): Observable<PaginatedSuppliersProduct> {
    return this.supabaseService.getRequest('products_per_supplier', this.generateParams(sort, data)).pipe(
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

  generateParams(sort: any, data: { supplierId: string, categoryId: string, page: number, limit: number }) {
    let params = new HttpParams()
      .set('offset', (data.page - 1) * data.limit)
      .set('limit', data.limit ==0?10:data.limit)
      .set('supplier_id', 'eq.' + data.supplierId)
      .set('category_id', 'eq.' + data.categoryId);
    if (sort.field) params = params.set('order', sort.field + "." + sort.order);
    return params;
  }


}

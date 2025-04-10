import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PaginatedSupplierCategory } from '../model/suppliers-category';
import { PaginatedCustomer } from '../model/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private supabaseService = inject(SupabaseService);

  constructor() { }


    getCustomersBySupplier(data: { supplierId: string, page: number, limit: number }): Observable<PaginatedCustomer> {
      let params = this.generateParams({},data);
      return this.supabaseService.getRequest('customers', params ).pipe(
        map((response: HttpResponse<any[]>) => {
          const contentRange = response.headers.get('Content-Range');
          const totalElements = contentRange
              ? parseInt(contentRange.split('/')[1], 10)
              : 0;
              return new PaginatedCustomer({
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

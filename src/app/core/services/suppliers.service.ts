import { HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { Supplier } from '../model/supplier';
import { PaginatedDeliveryTimeSlot } from '../model/supplier_schedule';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor() { }

  private supabaseService = inject(SupabaseService);
  getSupplierDataById(supplierId: string): Observable<Supplier[]> {
    return this.supabaseService.getRequest('suppliers', new HttpParams().set('id', 'eq.' + supplierId)).pipe(
      map((response: HttpResponse<Supplier[]>) => response.body || [])
    );
  }

  getSupplierSchedule(data: { supplierId: string, page: number, limit: number, postalCode: string }): Observable<PaginatedDeliveryTimeSlot> {
    let params = this.generateParams({}, data);
    return this.supabaseService.getRequest('supplier_schedule_postalcode', params).pipe(
      map((response: HttpResponse<any[]>) => {
        const contentRange = response.headers.get('Content-Range');
        const totalElements = contentRange
          ? parseInt(contentRange.split('/')[1], 10)
          : 0;
        return new PaginatedDeliveryTimeSlot({
          content: response.body || [],
          totalElements: totalElements
        });
      })
    );
  }
  generateParams(sort: any, data: { supplierId: string, page: number, limit: number, postalCode: string }) {
    let params = new HttpParams()
      .set('offset', (data.page - 1) * data.limit)
      .set('limit', data.limit == 0 ? 10 : data.limit)
      .set('supplier_id', 'eq.' + data.supplierId)
      .set('postal_code', 'like.*' + data.postalCode+'*')
      ;
    if (sort.field) params = params.set('order', sort.field + "." + sort.order);
    return params;
  }

}

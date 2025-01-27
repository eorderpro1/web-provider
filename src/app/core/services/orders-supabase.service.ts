import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../model/order';
import { SupabaseService } from './supabase.service';
import { PaginatedOrder } from '../model/paginated-order';

@Injectable({
  providedIn: 'root'
})
export class OrderSupabaseService {
  private supabaseService= inject(SupabaseService);  
  getOrders(filters: any,  sort: any, params:HttpParams): Observable<PaginatedOrder> {     

    if (filters.order_id) params = params.set('order_id', filters.order_id);
    if (filters.shop_name) params = params.set('shop_name', filters.shop_name);
    if (filters.order_created_at) params = params.set('order_created_at', filters.order_created_at);
    if (filters.orderDate) params = params.set('date_to_be_delivered', filters.deliveryDate);
    if (filters.day_of_week) params = params.set('day_of_week', filters.day_of_week);
    if (filters.start_time) params = params.set('start_time', filters.start_time);
    if (filters.is_delivered) params = params.set('is_delivered', filters.is_delivered);
    if (filters.total_cost) params = params.set('total_cost', filters.total_cost);

    if (sort.field) params = params.set('order', sort.field+"."+sort.order);

  
    return this.supabaseService.getRequest("orders_with_details", params).pipe(
      map((response: HttpResponse<any[]>) => {
        const contentRange = response.headers.get('Content-Range');
        const totalElements = contentRange 
          ? parseInt(contentRange.split('/')[1], 10) 
          : 0;
  
        return new PaginatedOrder({
          content: response.body || [], // Use an empty array if body is null
          totalElements: totalElements
        });
      })
    );
  }
 
}

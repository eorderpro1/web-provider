import { HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { PaginatedOrder } from '../model/paginated-order';
import { OrderItem } from '../model/orderItems';

@Injectable({
  providedIn: 'root'
})
export class OrderSupabaseService {
  private supabaseService = inject(SupabaseService);
  getOrderItems(orderId: string): Observable<OrderItem[]> {
    return this.supabaseService.getRequest('order_items_products', new HttpParams().set('order_id', 'eq.' + orderId)).pipe(
      map((response: HttpResponse<OrderItem[]>) => response.body || [])
    );
  }
  getOrders(filters: any, sort: any, data: { filterByShopName: string, filterByOrderId: string, page: number, limit: number, supplier_id: number }): Observable<PaginatedOrder> {
    let params = this.generateParams(data);
    params = this.settingFilters(filters, params, sort);


    return this.supabaseService.getRequest("orders_with_details", params).pipe(
      map((response: HttpResponse<any[]>) => {
        const contentRange = response.headers.get('Content-Range');
        const totalElements = contentRange
          ? parseInt(contentRange.split('/')[1], 10)
          : 0;

        return new PaginatedOrder({
          content: response.body || [],
          totalElements: totalElements
        });
      })
    );
  }
  private settingFilters(filters: any, params: HttpParams, sort: any) {
    if (filters.order_id) params = params.set('order_id', filters.order_id);
    if (filters.shop_name) params = params.set('shop_name', filters.shop_name);
    if (filters.order_created_at) params = params.set('order_created_at', filters.order_created_at);
    if (filters.orderDate) params = params.set('date_to_be_delivered', filters.deliveryDate);
    if (filters.day_of_week) params = params.set('day_of_week', filters.day_of_week);
    if (filters.start_time) params = params.set('start_time', filters.start_time);
    if (filters.is_delivered) params = params.set('is_delivered', filters.is_delivered);
    if (filters.total_cost) params = params.set('total_cost', filters.total_cost);
    if (sort.field) params = params.set('order', sort.field + "." + sort.order);
    return params;
  }

  private generateParams(data: { filterByShopName: string, filterByOrderId: string, page: number, limit: number, supplier_id: number, is_draft?: string }): HttpParams {
    const days = this.calculateTomorrowDate();
    let params = new HttpParams()
      .set('offset', (data.page - 1) * data.limit)
      .set('limit', data.limit)
      .set('is_draft', 'eq.' + data.is_draft)
      .set('supplier_id', 'eq.' + data.supplier_id)
      .set('shop_name', 'like.*' + data.filterByShopName + '*')
      .set('order_id', 'like.*' + data.filterByOrderId + '*')
      .append('order_created_at', 'gte.' + days.today)
      .append('order_created_at', 'lt.' + days.tomorrow);
    return params;
  }
  private calculateTomorrowDate(): any {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const startOfDay = `${yyyy}-${mm}-${dd}T00:00:00`;
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    const yyyyNext = nextDay.getFullYear();
    const mmNext = String(nextDay.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const ddNext = String(nextDay.getDate()).padStart(2, '0');
    const days = { today: startOfDay, tomorrow: `${yyyyNext}-${mmNext}-${ddNext}T00:00:00` };
    return days;
  }
}

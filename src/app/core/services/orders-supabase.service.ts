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
  fetchAllOrders(filters: any, sort: any, data: {
    page: number, limit: number, supplier_id: number, is_draft?: string
  }): Observable<PaginatedOrder> {
    let params = this.generateAllOrdersParams(data);
    params = this.settingAllOrdersFilters(filters, params, sort);
    return this.fetchOrdersWithDetails(params);
  }
  fetchPaginatedTodaysOrders(filters: any, sort: any, data: { filterByShopName: string, filterByOrderId: string, page: number, limit: number, supplier_id: number, todays: boolean }): Observable<PaginatedOrder> {
    let params = this.generateTodaysParams(data);
    if (sort.field) params = params.set('order', sort.field + "." + sort.order);

    return this.fetchOrdersWithDetails(params);
  }
  private generateTodaysParams(data: { filterByShopName: string, filterByOrderId: string, page: number, limit: number, supplier_id: number, is_draft?: string, todays: boolean }): HttpParams {
    const days = this.calculateTomorrowDate();
    let params = new HttpParams()
      .set('offset', (data.page - 1) * data.limit)
      .set('limit', data.limit)
      .set('supplier_id', 'eq.' + data.supplier_id)
      .set('shop_name', 'like.*' + data.filterByShopName + '*')
      .set('order_id', 'like.*' + data.filterByOrderId + '*')
      .append('order_created_at', 'gte.' + days.today)
      .append('order_created_at', 'lt.' + days.tomorrow)
      ;
    if (data.is_draft != undefined) {
      params = params.set('is_draft', 'eq.' + data.is_draft);
    }
    
    return params;
  }
  generateAllOrdersParams(data: {
    page: number, limit: number, supplier_id: number
  }): HttpParams {
    let params = new HttpParams()
      .set('offset', (data?.page - 1) * data.limit)
      .set('limit', data.limit)
      .set('supplier_id', 'eq.' + data.supplier_id);
    return params;
  }
  settingAllOrdersFilters(filters: any, params: any, sort: any) {
    if (filters.orderStatus) params = params.set('status', 'eq.'+filters.orderStatus);
    if (filters.filterByOrderId) params = params.set('order_id', 'like.*' +filters.filterByOrderId+"*");
    if (filters.filterByShopName) params = params.set('shop_name', 'like.*' +filters.filterByShopName+"*");
    if (filters.paymentStatus) params = params.set('is_paid', 'eq.'+filters.paymentStatus);
    if (filters.fromDate) params = params.append('order_created_at', 'gte.'+filters.fromDate);
    if (filters.toDate) params = params.set('order_created_at', 'lt.' +filters.toDate);
    if (sort.field) params = params.set('order', sort.field + "." + sort.order);
    return params;
  }

  private fetchOrdersWithDetails(params: HttpParams): Observable<PaginatedOrder> {
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

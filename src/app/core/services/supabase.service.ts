import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private apiUrl = 'https://ulufshgjfsfzwvdxdwth.supabase.co/rest/v1/';

  constructor(private http: HttpClient) {}
  getOrders(filters: any, page: number, limit: number, sort: any): Observable<HttpResponse<Order[]>> {
    let params = new HttpParams()
      .set('offset', (page - 1) * limit)
      .set('limit', limit)
      ;
      

    if (filters.status) params = params.set('supplier_id', filters.status);
    if (filters.shop) params = params.set('shop', filters.shop);
    if (filters.orderDate) params = params.set('created_at', filters.orderDate);
    if (filters.orderDate) params = params.set('date_to_be_delivered', filters.deliveryDate);

    if (sort.field) params = params.set('order', sort.field+"."+sort.order);

    return this.getRequest("orders?select=*,shops(*)",  params );
  }
  private getRequest(url: string, params: HttpParams): Observable<HttpResponse<any[]>> {
    let headers = new HttpHeaders()
      .set("Prefer","count=exact")
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsdWZzaGdqZnNmend2ZHhkd3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1OTI4NzAsImV4cCI6MjA0OTE2ODg3MH0.MYRnaSSPvklXWxkXof2lYAWioYAYjzZ25EKA-wWaHtM')
      .set('Content-Type', 'application/json')
      .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsdWZzaGdqZnNmend2ZHhkd3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1OTI4NzAsImV4cCI6MjA0OTE2ODg3MH0.MYRnaSSPvklXWxkXof2lYAWioYAYjzZ25EKA-wWaHtM');
  
    params = params.set('supplier_id', 'eq.23');
 
    return this.http.get<any[]>(this.apiUrl + url, {observe:'response', headers, params });
  }
}

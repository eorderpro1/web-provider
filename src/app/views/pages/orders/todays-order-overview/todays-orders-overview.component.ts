import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderSupabaseService } from '../../../../core/services/orders-supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ThemeCssVariableService } from '../../../../core/services/theme-css-variable.service';
import { SupabaseService } from '../../../../core/services/supabase.service';
import { Order } from '../../../../core/model/order';
import { SortableHeaderComponent } from '../sortable-header/sortable-header.component';

@Component({
  selector: 'app-orders-overview',
  standalone: true,
  imports: [
    NgbDropdownModule,
    FormsModule,
    CommonModule,
    NgbTypeaheadModule, NgbPaginationModule,
    SortableHeaderComponent
  ],
  providers: [OrderSupabaseService, HttpClient, SupabaseService],
  templateUrl: './todays-orders-overview.component.html',
  styleUrl: './todays-orders-overview.component.scss'
})
export class TodaysOrdersOverviewComponent implements OnInit {
  orders = signal<Order[]>([]);
  filters: any = { status: '', shop: '', orderDate: '' };
  sort: any = { field: '', order: '' };
  page: number = 1;
  limit: number = 10;
  destroy = inject(DestroyRef);
  totalPages = signal<number>(2)
  totalElements = signal<number>(2)
  themeCssVariables = inject(ThemeCssVariableService).getThemeCssVariables();
  orderService = inject(OrderSupabaseService);
  totalAmount: number;
  ngOnInit(): void {
    this.fetchOrders('', '');
  }
  fetchOrders(filterByShopName: string, filterByOrderId: string) {
    let params = this.generateParams(filterByShopName, filterByOrderId);

    const sub = this.orderService.getOrders(this.filters, this.sort, params).subscribe((data) => {
      this.orders.set(data.content);
      this.totalElements.set(data.totalElements);
      this.totalPages.set(Math.ceil(this.totalElements() / this.limit));
      this.totalAmount = this.orders().reduce((acc, order) => acc + order.total_cost, 0);
    });
  

    this.destroy.onDestroy(() => sub.unsubscribe());

  }

  private generateParams(filterByShopName: string, filterByOrderId: string) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const startOfDay = `${yyyy}-${mm}-${dd}T00:00:00`;
    const startOfNextDay = `${yyyy}-${mm}-${Number(dd) + 1}T00:00:00`;
    let params = new HttpParams()
      .set('offset', (this.page - 1) * this.limit)
      .set('limit', this.limit)
      .set('supplier_id', 'eq.23')
      .set('shop_name', 'like.*' + filterByShopName + '*')
      .set('order_id', 'like.' + filterByOrderId + '*')
      .set('order_created_at', 'gte.' + startOfDay)
      .set('order_created_at', 'lt.' + startOfNextDay);
    return params;
  }

  searchByShopName(event: KeyboardEvent): void {
    const val = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.fetchOrders(val, '');
  }

  sortData(field: string): void {
    if (this.sort.field === field) {
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.field = field;
      this.sort.order = 'asc';
    }
    this.fetchOrders('', '');
  }

  refreshOrders(): void {
    this.fetchOrders('', '');
  }
  getBadgeClass(status: boolean): string {
    return status ? 'success' : 'danger';
  }
}

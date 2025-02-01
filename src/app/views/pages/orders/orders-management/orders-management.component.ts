import { Component, DestroyRef, inject, input, OnInit, signal, TemplateRef } from '@angular/core';
import { ThemeCssVariableService } from '../../../../core/services/theme-css-variable.service';
import { NgbDropdownModule, NgbModal, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../../../../core/model/order';
import { OrderItem } from '../../../../core/model/orderItems';
import { OrderSupabaseService } from '../../../../core/services/orders-supabase.service';
import { UtilsService } from '../../../../core/services/utils.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../../core/services/supabase.service';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { SortableHeaderComponent } from '../sortable-header/sortable-header.component';

@Component({
  selector: 'app-orders-management',
  standalone: true,
  imports: [
    NgbDropdownModule,
    FormsModule,
    CommonModule,
    NgbTypeaheadModule, NgbPaginationModule,
    SortableHeaderComponent,
    OrderModalComponent
  ],
  providers: [OrderSupabaseService, HttpClient, SupabaseService],
  templateUrl: './orders-management.component.html',
  styleUrl: './orders-management.component.scss'
})
export class OrdersManagementComponent implements OnInit {
  orders = signal<Order[]>([]);
  private modalService = inject(NgbModal);
  orderService = inject(OrderSupabaseService);
  utils = inject(UtilsService)
  selectedOrder: Order;
  orderItems: OrderItem[] = [];
  private destroy = inject(DestroyRef);
  filters: any = { status: '', shop: '', orderDate: '' };
  sort: any = { field: '', order: '' };
  page: number = 1;
  limit: number = 10;
  totalPages = signal<number>(2);
  totalElements = signal<number>(2);
  deliveryDate: Date;
  totalAmount: string;
  trigger = input.required<boolean>();
  themeCssVariables = inject(ThemeCssVariableService).getThemeCssVariables();
  searchValueByName= signal<string>(''); 
  searchValueByOrderId= signal<string>(''); 
  ngOnInit(): void {
    // this.webSocketService.subscribeToOrders((order) => {
    //   if (order.is_draft === 'true') {
    //     this.orders().push(order);
    //   }
    // });
    this.fetchOrders('', '');
  }
  refreshOrders() {
    this.fetchOrders(this.searchValueByName(), this.searchValueByOrderId());
  }
  getBadgeClass(status: boolean): string {
    return status ? 'success' : 'danger';
  }
  fetchOrders(filterByShopName: string, filterByOrderId: string) {
    let params = { filterByShopName, filterByOrderId, page: this.page, limit: this.limit, supplier_id: 23, todays: false };
    const sub = this.orderService.getOrders(this.filters, this.sort, params).subscribe((data) => {
      this.orders.set(data.content);
      this.totalElements.set(data.totalElements);
      this.totalPages.set(Math.ceil(this.totalElements() / this.limit));
      this.totalAmount = this.orders().reduce((acc, order) => acc + order.total_cost, 0).toFixed(2);
    });
    this.destroy.onDestroy(() => sub.unsubscribe());
  }
  openScrollableModal(content: TemplateRef<any>, order: Order) {
    this.selectedOrder = order;
    this.deliveryDate = this.utils.getNextDateForDay(order.day_of_week);
    const sub = this.orderService.getOrderItems(order.id.toFixed()).subscribe((data) => {
      this.orderItems = data;
    });
    this.destroy.onDestroy(() => sub.unsubscribe());
    this.modalService.open(content, { scrollable: true, size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }
  searchByShopName(event: KeyboardEvent): void {
    this.searchValueByName.set((event.target as HTMLInputElement).value);
    this.page = 1;
    console.log(this.searchValueByName());
    this.fetchOrders(this.searchValueByName(), this.searchValueByOrderId());
  }
  searchByOrderId(event: KeyboardEvent): void {
    this.searchValueByOrderId.set((event.target as HTMLInputElement).value);
    this.page = 1;
    this.fetchOrders(this.searchValueByName(), this.searchValueByOrderId());
  }

  sortData(field: string): void {
    if (this.sort.field === field) {
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.field = field;
      this.sort.order = 'asc';
    }
    this.fetchOrders(this.searchValueByName(), this.searchValueByOrderId());
  }
}


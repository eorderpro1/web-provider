import { Component, DestroyRef, inject, input, OnInit, signal, TemplateRef } from '@angular/core';
import { NgbDropdownModule, NgbModal, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderSupabaseService } from '../../../../core/services/orders-supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SupabaseService } from '../../../../core/services/supabase.service';
import { Order } from '../../../../core/model/order';
import { SortableHeaderComponent } from '../sortable-header/sortable-header.component';
import { ReceivedNewOrderComponent } from "../received-new-order/received-new-order.component";
import { OrderItem } from '../../../../core/model/orderItems';
import { UtilsService } from '../../../../core/services/utils.service';
import { OrderModalComponent } from "../order-modal/order-modal.component";

@Component({
  selector: 'app-todays-orders-overview',
  standalone: true,
  imports: [
    NgbDropdownModule,
    FormsModule,
    CommonModule,
    NgbTypeaheadModule, NgbPaginationModule,
    SortableHeaderComponent,
    ReceivedNewOrderComponent,
    OrderModalComponent
],
  providers: [OrderSupabaseService, HttpClient, SupabaseService],
  templateUrl: './todays-orders-overview.component.html',
  styleUrl: './todays-orders-overview.component.scss'
})
export class TodaysOrdersOverviewComponent implements OnInit {

  orders = signal<Order[]>([]);
  private modalService = inject(NgbModal);
  utils = inject(UtilsService)
  selectedOrder: Order;
  orderItems: OrderItem[] = [];
  deliveryDate: Date;
  trigger = input.required<boolean>();
  filters: any = { status: '', shop: '', orderDate: '' };
  sort: any = { field: '', order: '' };
  page: number = 1;
  limit: number = 10;
  destroy = inject(DestroyRef);
  totalPages = signal<number>(2)
  totalElements = signal<number>(2)
  orderService = inject(OrderSupabaseService);
  totalAmount: string;
  ngOnInit(): void {
    this.fetchOrders('', '');
  }

  fetchOrders(filterByShopName: string, filterByOrderId: string) {
    let params = { filterByShopName, filterByOrderId, page: this.page, limit: this.limit, supplier_id: 23, is_draft: 'false' };

    const sub = this.orderService.getOrders(this.filters, this.sort, params).subscribe((data) => {
      this.orders.set(data.content.filter((order) => order.is_draft === false));
      this.totalElements.set(data.totalElements);
      this.totalPages.set(Math.ceil(this.totalElements() / this.limit));
      this.totalAmount = this.orders().reduce((acc, order) => acc + order.total_cost, 0).toFixed(2);
    });


    this.destroy.onDestroy(() => sub.unsubscribe());

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
  openScrollableModal(content: TemplateRef<any>, order: Order) {
    this.selectedOrder = order;
    this.deliveryDate = this.utils.getNextDateForDay(order.day_of_week);
    console.log(order.id);
    this.orderService.getOrderItems(order.id.toFixed()).subscribe((data) => {
      console.log(data);
      this.orderItems = data;
    });
    this.modalService.open(content, { scrollable: true, size: 'lg' }).result.then((result) => {
      
    }).catch((res) => { });
  }
}

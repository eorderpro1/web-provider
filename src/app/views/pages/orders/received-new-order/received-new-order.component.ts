import { Component, DestroyRef, inject, OnInit, signal, TemplateRef } from '@angular/core';
import { Order } from '../../../../core/model/order';
import { OrderSupabaseService } from '../../../../core/services/orders-supabase.service';
import { HttpParams } from '@angular/common/http';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderItem } from '../../../../core/model/orderItems';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UtilsService } from '../../../../core/services/utils.service';
import { OrderModalComponent } from "../order-modal/order-modal.component";

@Component({
  selector: 'app-received-new-order',
  standalone: true,
  imports: [CommonModule, OrderModalComponent, NgbPaginationModule, FormsModule],
  providers: [ BrowserModule],
  templateUrl: './received-new-order.component.html',
  styleUrl: './received-new-order.component.scss'
})
export class ReceivedNewOrderComponent implements OnInit {

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
  limit: number = 12;
  totalPages = signal<number>(2)
  totalElements = signal<number>(2)
  deliveryDate: Date;
  totalAmount: string;
  
  ngOnInit(): void {
    this.fetchOrders('', '');
  }
  refreshOrders() {
    this.fetchOrders('', '');
  }
  acceptOrder(order: any): void {
    this.orders.set(this.orders().filter((o) => o.id !== order.id));
  }
  fetchOrders(filterByShopName: string, filterByOrderId: string) {
    let params = { filterByShopName, filterByOrderId, page: this.page, limit: this.limit, supplier_id: 23, is_draft: 'true', todays: true };

    const sub = this.orderService.fetchPaginatedTodaysOrders(this.filters, this.sort, params).subscribe((data) => {
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
    this.modalService.open(content, { size: 'lg'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

}

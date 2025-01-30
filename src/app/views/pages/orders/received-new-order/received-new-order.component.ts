import { Component, DestroyRef, inject, OnInit, signal, TemplateRef } from '@angular/core';
import { SupabaseWebsocketService } from '../../../../core/services/supabase-websocket.service';
import { Order } from '../../../../core/model/order';
import { OrderSupabaseService } from '../../../../core/services/orders-supabase.service';
import { HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderItem } from '../../../../core/model/orderItems';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UtilsService } from '../../../../core/services/utils.service';
import { OrderModalComponent } from "../order-modal/order-modal.component";

@Component({
  selector: 'app-received-new-order',
  standalone: true,
  imports: [CommonModule, OrderModalComponent],
  providers:[SupabaseWebsocketService,BrowserModule],
  templateUrl: './received-new-order.component.html',
  styleUrl: './received-new-order.component.scss'
})
export class ReceivedNewOrderComponent implements OnInit {
  private webSocketService = inject(SupabaseWebsocketService);
  orders = signal<Order[]>([]);
  private modalService=  inject(NgbModal);
  utils=inject (UtilsService)
  selectedOrder: Order;
  orderItems: OrderItem[]=[];
  private destroy = inject(DestroyRef);
  filters: any = { status: '', shop: '', orderDate: '' };
  sort: any = { field: '', order: '' };
  page: number = 1;
  limit: number = 10;
  totalPages = signal<number>(2)
  totalElements = signal<number>(2)
  deliveryDate: Date;
  totalAmount: string;
  orderService = inject(OrderSupabaseService);
  ngOnInit(): void {
    // this.webSocketService.subscribeToOrders((order) => {
    //   if (order.is_draft === 'true') {
    //     this.orders().push(order);
    //   }
    // });
    this.fetchOrders('','');
  }
  acceptOrder(order: any): void {
    // Remove the order from the current list
    this.orders.set(this.orders().filter((o) => o.id !== order.id));
    // Send the order acceptance to the backend
    this.webSocketService.acceptOrder(order.id);
  }
  fetchOrders(filterByShopName: string, filterByOrderId: string) {
    let params = {filterByShopName, filterByOrderId, page: this.page, limit: this.limit, supplier_id: 23, is_draft: 'true'};

    const sub = this.orderService.getOrders(this.filters, this.sort, params).subscribe((data) => {
      this.orders.set(data.content);
      this.totalElements.set(data.totalElements);
      this.totalPages.set(Math.ceil(this.totalElements() / this.limit));
      this.totalAmount = this.orders().reduce((acc, order) => acc + order.total_cost, 0).toFixed(2);
    });
    this.destroy.onDestroy(() => sub.unsubscribe());
  }
  openScrollableModal(content: TemplateRef<any>, order : Order) {
    this.selectedOrder = order;
    this.deliveryDate= this.utils.getNextDateForDay(order.day_of_week);
    const sub =this.orderService.getOrderItems(order.id.toFixed()).subscribe((data) => {
      this.orderItems = data;
    });
    this.destroy.onDestroy(() => sub.unsubscribe());
    this.modalService.open(content, {scrollable: true, size:'lg'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }
  
}

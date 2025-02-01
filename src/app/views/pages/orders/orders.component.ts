import { Component, signal } from '@angular/core';
import { TodaysOrdersOverviewComponent } from './todays-order-overview/todays-orders-overview.component';
import { CardChoiceOrderComponent } from "./card-choice-order/card-choice-order.component";
import { OrdersManagementComponent } from "./orders-management/orders-management.component";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TodaysOrdersOverviewComponent, CardChoiceOrderComponent, CardChoiceOrderComponent, OrdersManagementComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  todaysOrderComponent = signal(true);
  orderManagementComponent = signal(false);
  selectedTitle: string | null = 'Today\'s Orders'; 
  triggerTodaysOrderComponent() {
    this.todaysOrderComponent.set(true);
    this.orderManagementComponent.set(false);
  }

  triggerOrderManagementComponent() {
    this.orderManagementComponent.set(true);
    this.todaysOrderComponent.set(false);
  }

onSelectOrders($event: string) {
  this.selectedTitle = $event; 
  if ($event === 'Today\'s Orders') {
    this.triggerTodaysOrderComponent();
  }
  else if ($event === 'Order Management') {
    this.triggerOrderManagementComponent();
  }
}

}

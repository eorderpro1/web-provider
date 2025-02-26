import { Component, inject, signal } from '@angular/core';
import { TodaysOrdersOverviewComponent } from './todays-order-overview/todays-orders-overview.component';
import { CardChoiceOrderComponent } from "./card-choice-order/card-choice-order.component";
import { OrdersManagementComponent } from "./orders-management/orders-management.component";
import { RouterOutlet, RouterLink, RouterLinkActive, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ CardChoiceOrderComponent,
    RouterModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
}
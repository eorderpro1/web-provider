import { Component } from '@angular/core';
import { TodaysOrdersOverviewComponent } from './todays-order-overview/todays-orders-overview.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TodaysOrdersOverviewComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

}

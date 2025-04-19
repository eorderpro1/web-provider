import { Component } from '@angular/core';
import { CardChoiceOrderComponent } from "../common-components/card-choice-order/card-choice-order.component";
import { RouterModule } from '@angular/router';

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
import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Order } from '../../../../core/model/order';
import { OrderItem } from '../../../../core/model/orderItems';
import { UtilsService } from '../../../../core/services/utils.service';

@Component({
  selector: 'app-order-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.scss'
})
export class OrderModalComponent {
private utils=inject(UtilsService);
selectedOrder =input.required<Order>();
orderItems = input.required<OrderItem[]>();
deliveryDate= input.required<Date>();



}

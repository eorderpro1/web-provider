import { Component, inject, OnInit } from '@angular/core';
import { ThemeCssVariableService } from '../../../core/services/theme-css-variable.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SupabaseService } from '../../../core/services/supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Order } from '../../../core/model/order';

@Component({
  selector: 'app-orders-overview',
    standalone: true,
    imports: [
      NgbDropdownModule,
      FormsModule,
      CommonModule,
      HttpClientModule
    ],
    providers: [SupabaseService, HttpClient],
  templateUrl: './orders-overview.component.html',
  styleUrl: './orders-overview.component.scss'
})
export class OrdersOverviewComponent implements OnInit{
 
  orders: Order[] = [];
  filters: any = { status: '', shop: '', orderDate: '' };
  sort: any = { field: '', order: '' };
  page: number = 1;
  limit: number = 10;
  totalPages: number = 1;
  themeCssVariables = inject(ThemeCssVariableService).getThemeCssVariables();
  orderService = inject(SupabaseService);
  ngOnInit(): void {
    this.fetchOrders();
  }
  fetchOrders() {
    this.orderService.getOrders(this.filters, this.page, this.limit, this.sort).subscribe((response: any) => {
      this.orders = response;
      console.log(response);
      this.totalPages = Math.ceil(response.length / this.limit);
    });
  }
  applyFilters(): void {
    this.page = 1; // Reset to the first page
    this.fetchOrders();
  }

  sortData(field: string): void {
    if (this.sort.field === field) {
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.field = field;
      this.sort.order = 'asc';
    }
    this.fetchOrders();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchOrders();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchOrders();
    }
  }
}

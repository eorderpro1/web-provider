import { Component, inject, OnInit } from '@angular/core';
import { ThemeCssVariableService } from '../../../core/services/theme-css-variable.service';
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SupabaseService } from '../../../core/services/supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Order } from '../../../core/model/order';

@Component({
  selector: 'app-orders-overview',
    standalone: true,
    imports: [
      NgbDropdownModule,
      FormsModule,
      CommonModule,
      HttpClientModule,
      DecimalPipe, NgbTypeaheadModule, NgbPaginationModule
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
  limit: number = 2;
  totalPages: number = 2;
  totalElements:number = 2
  themeCssVariables = inject(ThemeCssVariableService).getThemeCssVariables();
  orderService = inject(SupabaseService);
  ngOnInit(): void {
    this.fetchOrders();
  }
  fetchOrders() {

    this.orderService.getOrders(this.filters, this.page, this.limit, this.sort).subscribe((response: any) => {


      this.orders.push(response.body);
      let contentRange= response.headers.get('content-range');
      const parts = contentRange.split(/[/]/); // Split by both `-` and `/`
      this.totalElements = parseInt(parts[1], 10);
      console.log(this.orders)

      this.totalPages = Math.ceil(this.totalElements / this.limit);


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

  refreshOrders(): void {
    this.fetchOrders();
  }
  getBadgeClass(status: boolean): string {
    return status  ? 'success' : 'danger';
  }
}

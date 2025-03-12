import { 
  Component, inject, TemplateRef, signal, 
  DestroyRef,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal, NgbDropdownModule, NgbDatepickerModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeCssVariableService } from '../../../../core/services/theme-css-variable.service';
import { Order } from '../../../../core/model/order';
import { OrderItem } from '../../../../core/model/orderItems';
import { OrderSupabaseService } from '../../../../core/services/orders-supabase.service';
import { UtilsService } from '../../../../core/services/utils.service';
import { SupabaseService } from '../../../../core/services/supabase.service';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { SortableHeaderComponent } from '../../sortable-header/sortable-header.component';

@Component({
  selector: 'app-orders-management',
  standalone: true,
  imports: [
    NgbDropdownModule,
    FormsModule,
    CommonModule,
    NgbTypeaheadModule, NgbPaginationModule,
    SortableHeaderComponent,
    OrderModalComponent,
    NgbDatepickerModule
  ],
  providers: [OrderSupabaseService, HttpClient, SupabaseService],
  templateUrl: './orders-management.component.html',
  styleUrl: './orders-management.component.scss'
})
export class OrdersManagementComponent implements OnInit {
  ngOnInit(): void {
    // this.webSocketService.subscribeToOrders((order) => {
    //   if (order.is_draft === 'true') {
    //     this.orders().push(order);
    //   }
    // });
    this.buildAllOrdersRequest();
   }

  readonly calendar = inject(NgbCalendar);
  readonly formatter = inject(NgbDateParserFormatter);
  private readonly modalService = inject(NgbModal);
  readonly orderService = inject(OrderSupabaseService);
  readonly utils = inject(UtilsService);
  readonly themeCssVariables = inject(ThemeCssVariableService).getThemeCssVariables();
  private destroy = inject(DestroyRef);
  totalPages = signal<number>(2);
  totalElements = signal<number>(2);
  searchValueByName = signal<string>('');
  searchValueByOrderId = signal<string>('');
  orders = signal<Order[]>([]);

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;
  selectedOrder: Order;
  orderItems: OrderItem[] = [];
  sort: any = { field: '', order: '', orderStatus: '', shop: '', orderDate: '', fromDate: '', toDate: '', paymentStatus: '' };
  page: number = 1;
  limit: number = 10;
  deliveryDate: Date;
  totalAmount: string;
  selectedPaymentStatus: any = 'Κατάσταση πληρωμής';
  selectedOrderStatus: string = 'Κατάσταση Παραγγελίας';
  private paymentStatusMap: { [key: string]: string } =  {
    'Κατάσταση πληρωμής': 'false',
    'Πληρωμένες': 'true',
    'Απλήρωτες': 'false'
  };
  private badgeDeliveredClassMap = new Map<string, string>([
    ['Delivered', 'success'],
    ['Pending', 'warning'],
    ['Canceled', 'danger']
  ]);
  private orderStatusMap: { [key: string]: string } = {
    'Κατάσταση Παραγγελίας': '',
    'Ολες': '',
    'Σε επεξεργασία': 'Pending',
    'Προς Παράδοση': 'OnGoing',
    'Κλειστές': 'Delivered',
    'Ακυρωμένες': 'Canceled'
  };

  refreshOrders() {
    this.buildAllOrdersRequest();
  }
  getBadgePaidClass(status: boolean): string {
    return status ? 'success' : 'danger';
  }
  getBadgeDeliveredClass(status: string): string {
    return this.badgeDeliveredClassMap.get(status) || 'info';
  }
  fetchOrders(filters: {
    filterByShopName?: string, filterByOrderId?: string, paymentStatus?: string,
    orderStatus?: string, fromDate?: string, toDate?: string
  }) {
    let params = { page: this.page, limit: this.limit, supplier_id: 23 };
    const sub = this.orderService.fetchAllOrders(filters, this.sort, params).subscribe((data) => {
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
    this.modalService.open(content, { scrollable: true, size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  searchByShopName(event: KeyboardEvent): void {
    this.searchValueByName.set((event.target as HTMLInputElement).value);
    this.page = 1;
    console.log(this.searchValueByName());
    const filterParams = {
      filterByShopName: this.searchValueByName()
    };
    this.fetchOrders(filterParams);
  }
  searchByOrderId(value: string): void {
    this.searchValueByOrderId.set(value);
    this.page = 1;
    this.buildAllOrdersRequest();
  }

  sortData(field: string): void {
    if (this.sort.field === field) {
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.field = field;
      this.sort.order = 'asc';
    }
    this.buildAllOrdersRequest();
  }
  selectPaymentStatus(status: any) {
    this.selectedPaymentStatus = status;
    this.buildAllOrdersRequest();
  }
  setSelectedOrderStatus(status: string) {
    this.selectedOrderStatus = status;
    this.buildAllOrdersRequest();
  }

  private buildAllOrdersRequest() {
    const filterParams = {
      filterByShopName: this.searchValueByName(),
      filterByOrderId: this.searchValueByOrderId(),
      paymentStatus: this.paymentStatusMap[this.selectedPaymentStatus] ,
      orderStatus: this.orderStatusMap[this.selectedOrderStatus],
      fromDate: this.fromDate ? this.formatDate(this.fromDate) : '',
      toDate: this.toDate ? this.formatDate(this.toDate) : ''
    };
    this.fetchOrders(filterParams);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.buildAllOrdersRequest();
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  formatDate(json: any): string {
    const { year, month, day } = json;
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}T00:00:00`;
  }
}


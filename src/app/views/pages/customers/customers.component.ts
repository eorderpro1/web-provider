import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CustomersService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/model/customers';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  constructor() { }
  customerService = inject(CustomersService);
  customers = signal<Customer[]>([]);
  private destroy = inject(DestroyRef);
    filters: any = { status: '', shop: '', orderDate: '' };
    sort: any = { field: '', order: '' };
    page: number = 1;
    limit: number = 10;
    totalPages = signal<number>(2)
    totalElements = signal<number>(2)
  ngOnInit(): void {
this.fetchAllCustmersOfTheSupplier();  }
  fetchAllCustmersOfTheSupplier() {
    let params = { supplierId: '23', page: this.page, limit: this.limit};

    const sub = this.customerService.getCustomersBySupplier(params).subscribe((data) => {
      this.customers.set(data.content);
      this.totalElements.set(data.totalElements);
      this.totalPages.set(Math.ceil(this.totalElements() / this.limit));
    });
    this.destroy.onDestroy(() => sub.unsubscribe());
  }


}

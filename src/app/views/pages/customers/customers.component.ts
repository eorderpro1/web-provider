import { Component, DestroyRef, inject, OnInit, signal, TemplateRef } from '@angular/core';
import { CustomersService } from '../../../core/services/customers.service';
import { Customer } from '../../../core/model/customers';
import { Order } from '../../../core/model/order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCustomerComponent } from "./modal-customer/modal-customer.component";
import { finalize } from 'rxjs';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [ModalCustomerComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  constructor() { }
  customerService = inject(CustomersService);
  customers = signal<Customer[]>([]);
  selectedCustomer: Customer;
  private readonly modalService = inject(NgbModal);

  private destroy = inject(DestroyRef);
  sort: any = { field: '', order: '' };
  page: number = 1;
  limit: number = 10;
  totalPages = signal<number>(2)
  totalElements = signal<number>(2)
  isLoading: boolean = false;

  ngOnInit(): void {
    this.fetchAllCustmersOfTheSupplier();
  }
  fetchAllCustmersOfTheSupplier() {
    let params = { supplierId: '23', page: this.page, limit: this.limit };

    const sub = this.customerService.getCustomersBySupplier(params)

    .subscribe((data) => {
      this.customers.set(data.content);
      this.totalElements.set(data.totalElements);
      this.totalPages.set(Math.ceil(this.totalElements() / this.limit));
      this.isLoading = true;

    }
  );
    this.destroy.onDestroy(() => sub.unsubscribe());
  }

  openScrollableModal(content: TemplateRef<any>, customer: Customer) {
    this.selectedCustomer = customer;

    this.modalService.open(content, { scrollable: true, size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }
}

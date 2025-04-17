import { Component, input } from '@angular/core';
import { Customer } from '../../../../core/model/customers';

@Component({
  selector: 'app-modal-customer',
  standalone: true,
  imports: [],
  templateUrl: './modal-customer.component.html',
  styleUrl: './modal-customer.component.scss'
})
export class ModalCustomerComponent {

  selectedCustomer =input.required<Customer>()
  selectedTag: string = 'VIP';

  toggleTag(tag: string) {
    this.selectedTag = tag;

  }
  isSelected(tagName: string) {
    if (this.selectedTag === tagName) {
      return true;
    }
    return false;
  }
  

}

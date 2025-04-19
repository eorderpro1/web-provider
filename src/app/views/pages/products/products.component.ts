import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardChoiceOrderComponent } from '../common-components/card-choice-order/card-choice-order.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardChoiceOrderComponent,
      RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}

import { Component } from '@angular/core';
import { CardChoiceOrderComponent } from "../../common-components/card-choice-order/card-choice-order.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [CardChoiceOrderComponent,
        RouterModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss'
})
export class AddProductsComponent {

}

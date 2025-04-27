import { Component, computed, input, output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-choice-order',
  standalone: true,
  imports: [RouterLink, RouterModule
  ],
  templateUrl: './card-choice-order.component.html',
  styleUrl: './card-choice-order.component.scss'
})
export class CardChoiceOrderComponent {


  title = input.required<string>();
  image = input<string>();
  routerLinkValue = input.required<string>();
  imagePath = computed(() => '/images/photos/' + this.image());


}

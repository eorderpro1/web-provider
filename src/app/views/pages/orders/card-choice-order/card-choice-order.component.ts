import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-card-choice-order',
  standalone: true,
  imports: [],
  templateUrl: './card-choice-order.component.html',
  styleUrl: './card-choice-order.component.scss'
})
export class CardChoiceOrderComponent {

  title = input.required<string>();
  image = input.required<string>();
  selected = input.required<boolean>(); // Receives selection state from parent

  select = output<string>();
  imagePath = computed(() => '/images/photos/' + this.image());
  onSelectOrderComponent() {
    this.select.emit(this.title());

  }

}

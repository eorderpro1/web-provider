import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-card-choice-order',
  standalone: true,
  imports: [],
  templateUrl: './card-choice-order.component.html',
  styleUrl: './card-choice-order.component.scss'
})
export class CardChoiceOrderComponent {

  selectedActiveOrderComponent :boolean = false;
   title = input.required<string>();
   image = input.required<string>();
  select = output<string>();
  imagePath = computed(()=>'/images/photos/'+this.image());
onSelectUser() {
    this.select.emit(this.title());
    this.selectedActiveOrderComponent = true;
}

}

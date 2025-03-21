import { Component, input } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [ 
    RouterLink,
    RouterLinkActive],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss'
})
export class CategoryItemComponent {
category = input.required<any>();

}

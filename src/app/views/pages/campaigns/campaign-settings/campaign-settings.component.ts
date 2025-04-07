import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campaign-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './campaign-settings.component.html',
  styleUrl: './campaign-settings.component.scss'
})
export class CampaignSettingsComponent {
  categories = ['Ρούχα', 'Ηλεκτρονικά', 'Αξεσουάρ'];
  products = [
    { id: '1', name: 'Μπλούζα', category: 'Ρούχα' },
    { id: '2', name: 'Παντελόνι', category: 'Ρούχα' },
    { id: '3', name: 'Laptop', category: 'Ηλεκτρονικά' },
    // ...more products
  ];

  selectedCategory = '';
  advertiseAllProducts = true;
  selectedProductIds: string[] = [];

  get filteredProducts() {
    return this.products.filter(p => p.category === this.selectedCategory);
  }

  onCategoryChange(category: string) {
    this.selectedProductIds = [];
  }
}

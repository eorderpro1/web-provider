import { Component } from '@angular/core';
import { AdvertisementBlock } from '../../../../../core/model/advertisement-block';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multi-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './multi-add.component.html',
  styleUrl: './multi-add.component.scss'
})
export class MultiAddComponent {
  categories = ['Ρούχα', 'Ηλεκτρονικά', 'Αξεσουάρ'];
  products = [
    { id: '1', name: 'Μπλούζα', category: 'Ρούχα' },
    { id: '2', name: 'Παντελόνι', category: 'Ρούχα' },
    { id: '3', name: 'Laptop', category: 'Ηλεκτρονικά' },
    { id: '4', name: 'Κάλτσες', category: 'Αξεσουάρ' },
  ];

  ads: AdvertisementBlock[] = [this.createEmptyAdBlock()];

  createEmptyAdBlock(): AdvertisementBlock {
    return {
      id:0,
      category: '',
      useAllProducts: true,
      selectedProducts: [],
      image: null,
      adText: '',
      callToAction: '',
      startDate: '',
      endDate: '',
      costPerDay: 0
    };
  }

  addAdBlock() {
    this.ads.push(this.createEmptyAdBlock());
  }

  removeAdBlock(index: number) {
    this.ads.splice(index, 1);
  }

  getFilteredProducts(category: string) {
    return this.products.filter(p => p.category === category);
  }

  handleImageUpload(event: any, ad: AdvertisementBlock) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => ad.image = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  submitAllAds() {
    console.log('Submitted Ads:', this.ads);
    // Connect to backend API here if needed
  }
}

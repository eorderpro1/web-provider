import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdvertisementBlock } from '../../../../core/model/advertisement-block';
import { JsonPipe } from '@angular/common';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-campaign-settings',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, JsonPipe],
  templateUrl: './campaign-settings.component.html',
  styleUrl: './campaign-settings.component.scss'
})
export class CampaignSettingsComponent {
   categories = ['Ζυμαρικα', 'Αναψυκτικα', 'Γαλακτοκομικά'];
    products = [
      { id: '1', name: 'Πένες', category: 'Ζυμαρικα' },
      { id: '2', name: 'Τορτελινια', category: 'Ζυμαρικα' },
      { id: '3', name: 'Coca-cola', category: 'Αναψυκτικα' },
      { id: '4', name: 'Κεφιρ', category: 'Γαλακτοκομικά' },
    ];
  
    ads: AdvertisementBlock[] = [this.createEmptyAdBlock()];
  
    createEmptyAdBlock(): AdvertisementBlock {
      let id = this.ads !==undefined  ? this.ads[this.ads.length - 1].id + 1 : 0;
      return {
        id:id,
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

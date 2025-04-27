import { Component, inject, OnInit, signal } from '@angular/core';
import { CardChoiceOrderComponent } from "../../common-components/card-choice-order/card-choice-order.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [CardChoiceOrderComponent,
        RouterModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss'
})
export class AddProductsComponent implements OnInit {
 
  
  router =inject(Router);
  add_menu_cards = [
    {
      id:1,
      title: 'Προσθήκη Ενός Προϊόντος',
      route: '/products/add/single-product',
      description: 'Εισάγετε μεμονωμένα προϊόντα στο σύστημα.'
    },
    {
      id:2,
      title: 'Προσθήκη Ολόκληρης Κατηγορίας',
      route: '/products/add/category-with-products',
      description: 'Προσθέστε μια κατηγορία προιόντων, απο τις διαθέσιμες κατηγορίες, και εμπλουτίστε την με τα προιόντα σας.'
    },
    {
      id:3,
      title: 'Ανεβασμα Αρχείου',
      route: '/products/add/upload-file',
      description: 'Ανεβάστε αρχείο για μαζική προσθήκη προϊόντων.'
    },
    {
      id:4,
      title: 'Συγχρονισμός με ERP',
      route: '/products/add/erp-sync',
      description: 'Συγχρονίστε προϊόντα απευθείας από το ERP σας.'
    }
  ];
  activeCardIndex=signal<any>(null);
  ngOnInit(): void {  
    this.activeCardIndex.set(this.add_menu_cards.find(card => card.route === this.router.url));
  }
 
  
  setActiveCard(selectedMenu: any) {
    this.activeCardIndex.set(selectedMenu) ;
  }

}

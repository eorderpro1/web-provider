import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campaign-footer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './campaign-footer.component.html',
  styleUrl: './campaign-footer.component.scss'
})
export class CampaignFooterComponent {
  cost: number = 0;
  isEnabled =input.required<boolean>();

  onToggleChange() {
    // You can handle logic here if needed
  }
}

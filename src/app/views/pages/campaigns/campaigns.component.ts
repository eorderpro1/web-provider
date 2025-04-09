import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CampaignSettingsComponent } from "./campaign-settings/campaign-settings.component";
import { CampaignButtonsComponent } from './campaign-buttons/campaign-buttons.component';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [NgbAccordionModule, FormsModule, CampaignButtonsComponent, CampaignSettingsComponent],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss'
})
export class CampaignsComponent {

  cost: number = 0;
  isPpcEnabled=signal<boolean>(false);
  isPremiumPlacementEnabled=signal<boolean>(false);
  isPerformanceBasedAdvertisingEnabled=signal<boolean>(false)


}

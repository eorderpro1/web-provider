import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CampaignFooterComponent } from './campaign-footer/campaign-footer.component';
import { CampaignSettingsComponent } from "./campaign-settings/campaign-settings.component";

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [NgbAccordionModule, FormsModule, CampaignFooterComponent, CampaignSettingsComponent],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss'
})
export class CampaignsComponent {

  cost: number = 0;
  isPpcEnabled: boolean = false;
  isPremiumPlacementEnabled: boolean = false;
  isPerformanceBasedAdvertisingEnabled: boolean = false;


}

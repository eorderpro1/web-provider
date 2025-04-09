import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campaign-buttons',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './campaign-buttons.component.html',
  styleUrl: './campaign-buttons.component.scss'
})
export class CampaignButtonsComponent {
  cost: number = 0;

  isEnabled = input.required<boolean>(); // this stays a signal
  enabled = output<boolean>();

  onToggleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.enabled.emit(input.checked); // Emit the new boolean value
  }
}

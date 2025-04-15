import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-postal-codes-settings',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './postal-codes-settings.component.html',
  styleUrl: './postal-codes-settings.component.scss'
})
export class PostalCodesSettingsComponent {
  newDay: string = '';
  newSlot: string = '';
  postalCodes = ['11527', '11528', '10443'];
  selectedPostalCode: string = '11527';

  // Schedule structure
  deliverySchedule: { [postalCode: string]: { [day: string]: string[] } } = {
    '11527': {
      Monday: ['08:00–12:00', '16:00–19:00'],
      Wednesday: ['09:00–14:00']
    },
    '11528': {},
    '10443': {}
  };

  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  selectPostalCode(code: string) {
    this.selectedPostalCode = code;
  }

  addDay(day: string) {
    const schedule = this.deliverySchedule[this.selectedPostalCode];
    if (!schedule[day]) {
      schedule[day] = [];
    }
  }

  addTimeSlot(day: string, slot: string) {
    this.deliverySchedule[this.selectedPostalCode][day].push(slot);
  }

  removeTimeSlot(day: string, index: number) {
    this.deliverySchedule[this.selectedPostalCode][day].splice(index, 1);
    if (this.deliverySchedule[this.selectedPostalCode][day].length === 0) {
      delete this.deliverySchedule[this.selectedPostalCode][day];
    }
  }
}

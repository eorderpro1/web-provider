import { Component, DestroyRef, inject, OnInit, signal, effect, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SuppliersService } from '../../../../core/services/suppliers.service';
import { DeliveryTimeSlot, PaginatedDeliveryTimeSlot } from '../../../../core/model/supplier_schedule';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-postal-codes-settings',
  standalone: true,
  imports: [FormsModule, NgbPagination,
    SweetAlert2Module],
  templateUrl: './postal-codes-settings.component.html',
  styleUrl: './postal-codes-settings.component.scss'
})
export class PostalCodesSettingsComponent implements OnInit {


  newDay: string = '';
  postalCodes = signal<string[]>([]);
  selectedPostalCode: string = '';
  selectedStartSlot: string = '';
  selectedEndSlot: string = '';
  startSlotIntervals: string[] = [];
  endSlotIntervals: string[] = [];
  supplierService = inject(SuppliersService);
  sort: any = { field: '', order: '' };
  allPostalCodes: string[] = [];          // unique postal codes
  displayedPostalCodes: string[] = [];    // paginated codes
  page = 1;
  limitPostal = 10;
  totalElementsCount = 0;
  private destroy = inject(DestroyRef);
  supplierSchedule = signal<DeliveryTimeSlot[]>([]);
  isLoading: boolean = false;

  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  deliverySchedule = computed(() => {
    const scheduleMap: { [postalCode: string]: { [day: string]: string[] } } = {};

    this.supplierSchedule().forEach((slot) => {
      const { postal_code, day_of_week, start_time, end_time } = slot;

      if (!scheduleMap[postal_code]) {
        scheduleMap[postal_code] = {};
      }

      if (!scheduleMap[postal_code][day_of_week]) {
        scheduleMap[postal_code][day_of_week] = [];
      }

      scheduleMap[postal_code][day_of_week].push(`${start_time.slice(0, 5)}–${end_time.slice(0, 5)}`);
    });

    return scheduleMap;
  });

  ngOnInit(): void {
    this.generateTimeSlots();
    this.fetchSuppliersSchedule('', '23');
  }
  selectPostalCode(code: string) {
    this.selectedPostalCode = code;
  }
  constructor() {
    effect(() => {
      this.postalCodes().length = 0;
      this.supplierSchedule().forEach((slot) => {
        if (!this.postalCodes().includes(slot.postal_code)) {
          this.postalCodes().push(slot.postal_code);
        }
      })
      this.applyPostalCodePagination();
    }, { allowSignalWrites: true });

  }
  applyPostalCodePagination() {
    const start = (this.page - 1) * this.limitPostal;
    const end = start + this.limitPostal;
    this.displayedPostalCodes = this.allPostalCodes.slice(start, end);
  }
  
  onPostalPageChange(newPage: number) {
    this.page = newPage;
    this.applyPostalCodePagination();
  }
  
  onPostalLimitChange() {
    this.page = 1;
    this.applyPostalCodePagination();
  }
  
  totalElements() {
    return this.totalElementsCount;
  }
  

  searchByTK(event: KeyboardEvent) {
    let searchValue = (event.target as HTMLInputElement).value;

    this.fetchSuppliersSchedule(searchValue, '23');
  }
  addDay(day: string) {
    const schedule = this.deliverySchedule()[this.selectedPostalCode];
    if (!schedule[day]) {
      schedule[day] = [];
    }
  }

  addTimeSlot(day: string, startSlot: string, endSlot: string) {
    if (!day) {
      Swal.fire({
        title: "Προσοχή",
        text: "Παρακαλώ επιλέξτε ημέρα.",
        icon: "error"
      });
      return;
    }
    if (!startSlot || !endSlot) {
      Swal.fire({
        title: "Προσοχή",
        text: "Παρακαλώ επιλέξτε ώρα έναρξης και λήξης.",
        icon: "error"
      });
      return;
    }
    if (startSlot == endSlot) {
      Swal.fire({
        title: "Προσοχή",
        text: "Η ώρα έναρξης και λήξης είναι ίδιες.",
        icon: "error"
      });
      return;
    }
    this.deliverySchedule()[this.selectedPostalCode][day].push(`${startSlot}–${endSlot}`);
  }

  removeTimeSlot(day: string, index: number) {
    this.deliverySchedule()[this.selectedPostalCode][day].splice(index, 1);
    if (this.deliverySchedule()[this.selectedPostalCode][day].length === 0) {
      delete this.deliverySchedule()[this.selectedPostalCode][day];
    }
  }

  generateTimeSlots() {
    const startHour = 6;  // earliest delivery time
    const endHour = 22;   // latest delivery time
    const interval = 30;  // minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += interval) {
        const timseSlot = this.formatTime(hour, minutes);
        this.startSlotIntervals.push(`${timseSlot}`);
        this.endSlotIntervals.push(`${timseSlot}`);
      }
    }
  }
  formatTime(h: number, m: number): string {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }
  fetchSuppliersSchedule(pc: string = '', supplierId: string = '') {
    let params = { supplierId: supplierId, postalCode: pc };
    this.isLoading = true;

    const sub = this.supplierService.getSupplierSchedule(params).subscribe((data) => {
      const rawData = data;

      const uniqueCodes = Array.from(new Set(rawData.map(item => item.postal_code)));
  
      this.allPostalCodes = uniqueCodes;
      this.supplierSchedule.set(rawData);
      this.totalElementsCount = uniqueCodes.length;
      this.applyPostalCodePagination();   
         this.isLoading = false;
    });


    this.destroy.onDestroy(() => sub.unsubscribe());
  }
}



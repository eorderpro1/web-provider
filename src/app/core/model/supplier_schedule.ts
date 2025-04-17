export interface DeliveryTimeSlot {
    supplier_id: number;
    day_of_week: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    start_time: string; 
    end_time: string;   
    postal_code: string;
  }


  export class PaginatedDeliveryTimeSlot {
    content: DeliveryTimeSlot[] = [];
    totalElements: number = 0;
    constructor(data: Partial<PaginatedDeliveryTimeSlot>) {
      Object.assign(this, data);
    }
  }